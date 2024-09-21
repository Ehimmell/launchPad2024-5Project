import os
from openai import AzureOpenAI
from dotenv import load_dotenv
import pandas

load_dotenv()

endpoint = os.getenv("ENDPOINT")
deployment = os.getenv("DEPLOYMENT_NAME")
subscription_key = os.getenv("KEY_1")

reviews = pandas.read_csv('reviews.csv')
reviews = reviews['Review'].tolist()

client = AzureOpenAI(
    azure_endpoint = endpoint,
    api_key = subscription_key,
    api_version = "2024-05-01-preview",
)

step = min(len(reviews), 10)
while len(reviews) > 1:
    summarized = []
    step = min(len(reviews), 10)
    for i in range(0, len(reviews), step):
        these_reviews = []
        if i + step > len(reviews):
            these_reviews = reviews[i:]
        else:
            these_reviews = reviews[i:i+step]
        completion = client.chat.completions.create(
            model=deployment,
            messages= [
            {
                "role": "system",
                "content": f"You are a summary bot that summarizes reviews of professors. Please summarize these reviews: {these_reviews}"
            }
        ],
            max_tokens=3000,
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
            stream=False
        )

        response = completion.choices[0].message.content

        summarized.append(response)

    reviews = summarized

print(reviews)