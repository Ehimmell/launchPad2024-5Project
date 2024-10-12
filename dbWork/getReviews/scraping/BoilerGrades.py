import selenium as se
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep
import pandas as pd


def scrape(profName):
    driver = se.webdriver.Chrome()

    driver.get('https://www.boilergrades.com')

    profSearch = driver.find_element(By.XPATH, '//input[@id="input-7"]')

    profName = profName.split()

    profSearch.send_keys(profName[-1] + ", " + ' '.join(profName[:-1]))

    profSearch.send_keys(Keys.RETURN)

    sleep(1)

    numbersSearch = driver.find_elements(By.XPATH, '//div["@class=col-sm-3 col-md-2 col-4"]')

    classes, grades = [], []

    for number in numbersSearch:
        if len(number.text) < 15 and '.' not in number.text and '0' in number.text:
            classes.append(number.text)
        elif len(number.text) < 6 and '.' in number.text and (
                '4' in number.text or '3' in number.text or '2' in number.text or '1' in number.text or '0' in number.text):
            grades.append(number.text)

    grades = [grades[i] for i in range(len(grades)) if i % 2 == 1]

    correctedClasses = []
    correctedGrades = []

    classesSeen = set()

    for i in range(len(classes)):
        if classes[i] not in classesSeen:
            correctedClasses.append(classes[i])
            classesSeen.add(classes[i])
            correctedGrades.append(grades[i + 1])

    c2g = dict(zip(correctedClasses, correctedGrades))

    return c2g