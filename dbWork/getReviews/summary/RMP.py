import selenium as se
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from time import sleep


def scrape(profName):
    chrome_options = Options()

    driver = webdriver.Chrome(options=chrome_options)

    driver.get('https://www.ratemyprofessors.com/')

    def check_ad():
        try:
            ad = driver.find_element(By.XPATH, "//a[@class='bx-close bx-close-link bx-close-inside']")
            ad.click()
        except:
            return None

    while True:
        try:
            wait = WebDriverWait(driver, 2)
            pop_up_button = wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Close']")))

            pop_up_button.click()
        except TimeoutException:
            break
    check_ad()
    search = driver.find_element(By.XPATH, "//input[@type='text']")

    search.send_keys("Purdue University West Lafayette")

    search.send_keys(Keys.RETURN)
    check_ad()
    schoolOrProf = driver.find_element(By.XPATH,
                                       "//button[@class='TeacherSchoolToggleButton__StyledToggleButton-sc-15dbb0q-0 gmfVsA']")

    schoolOrProf.click()
    check_ad()
    prof = driver.find_element(By.XPATH,
                               "//div[@class='TeacherSchoolToggleButton__StyledTeacherSchoolDropdown-sc-15dbb0q-3 ikEasa']")
    prof.click()
    check_ad()
    profNameInput = driver.find_element(By.XPATH, "//input[@placeholder='Professor name']")

    profNameInput.send_keys(profName)

    schoolName = driver.find_element(By.XPATH, "//input[@placeholder='Your school']")

    schoolName.send_keys("Purdue University - West Lafayette")

    profNameInput.send_keys(Keys.RETURN)
    sleep(0.5)

    clear = driver.find_element(By.XPATH, "//button[@title='Clear']")

    clear.click()

    profs = driver.find_elements(By.XPATH, "//a[@class='TeacherCard__StyledTeacherCard-syjs0d-0 dLJIlx']")

    check_ad()

    try:
        profs[0].click()
    except:
        driver.quit()

    check_ad()

    sleepsecs = 0

    while True:
        try:
            load_more = driver.find_element(By.XPATH, "//button[text()= 'Load More Ratings']")
            break
        except:
            sleep(0.1)
            continue

    while True:
        try:
            load_more = driver.find_element(By.XPATH, "//button[text()= 'Load More Ratings']")
            load_more.click()
            sleep(2)
        except:
            break

    check_ad()

    texts = driver.find_elements(By.XPATH,
                                 "//li//div//div//div//div[@class='Comments__StyledComments-dzzyvm-0 gRjWel']")

    reviews = []

    for text in texts:
        reviews.append(text.text)

    driver.quit()

    return reviews