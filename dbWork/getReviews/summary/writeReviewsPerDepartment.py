import pandas as pd
from gptCall import call
from ..scraping.RMP import
def write(csvName):
    csv = f'{csvName}.csv'
    names = pd.read_csv(csv)

    for i in range(len(names)):
        name = names[0]

