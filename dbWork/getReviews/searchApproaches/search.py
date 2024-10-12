import pandas
from sentence_transformers import SentenceTransformer
import pickle

vectors = pandas.read_csv('professorNameVectors.csv')

model = SentenceTransformer('bert-base-nli-mean-tokens')

nn = None

with open('knn.pkl', 'rb') as f:
    nn = pickle.load(f)

def search(input):
    input_vector = model.encode(input)

    distance, indices = nn.kneighbors([input_vector])

    neighbors = vectors.iloc[indices[0]]['names'].to_list()

    return [neighbor.strip() for neighbor in neighbors]



print(search('Andrew Freed'))