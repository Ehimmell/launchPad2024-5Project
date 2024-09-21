from scraping import webScraper
from summary import gptCall


def get(profName):
    reviews = webScraper.scrape(profName)
    summaries = gptCall.call(reviews)
    return summaries


