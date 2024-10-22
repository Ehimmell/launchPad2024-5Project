import os
from openai import AzureOpenAI
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

endpoint = os.getenv("ENDPOINT")
deployment = os.getenv("DEPLOYMENT_NAME")
subscription_key = os.getenv("KEY_1")


def summarize(reviewsList):
    def call(reviews):
        client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=subscription_key,
            api_version="2024-05-01-preview",
        )

        completion = client.chat.completions.create(
            model=deployment,
            messages=[
                {
                    "role": "system",
                    "content": f"You are a summary bot that summarizes reviews of "
                               f"professors. Please summarize these reviews: {reviews}. "
                               f"Keep it short and sweet, please! "
                               f"Also, please note that this is about one professor. "
                               f"If multiple names for the professor are used then one "
                               f"name is first and the other last."
                }
            ],
            max_tokens=1000,
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
            stream=False
        )

        return completion.choices[0].message.content

    if len(reviewsList) > 100:
        reviewsList = reviewsList[:100]
    while len(reviewsList) > 1:

        summaries, theseReviews, i, cnt = [], [], 0, 0

        while i < len(reviewsList):
            if cnt + len(reviewsList[i]) <= 1000:
                cnt += len(reviewsList[i])
                theseReviews.append(reviewsList[i])
                i+=2
            else:
                if cnt == 0:
                    i+=2
                else:
                    summaries.append(call(theseReviews))
                    theseReviews, cnt = [], 0

        reviewsList = summaries

    return reviewsList[0]


print(summarize(list(pd.read_csv('reviews.csv').values.reshape(-1))))