import pandas as pd
from gptCall import call
from RMP import scrape
def write(csvName):
    summaries= []
    csv = f'{csvName}.csv'
    names = pd.read_csv(csv)

    for i in range(len(names)):
        name = names.loc[i]

        reviews = scrape(name)[0:100]

        if len(reviews) >= 10:
            summary = call(reviews)
            summaries.append(summary)
        else:
            summaries.append('NA')

    names['Summary'] = summaries

    names.to_csv(f'{csvName}_with_summaries.csv')


write('csprofessorNames')

