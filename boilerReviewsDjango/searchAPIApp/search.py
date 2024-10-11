import pandas
from sentence_transformers import SentenceTransformer
import pickle
from django.http import JsonResponse

vectors = pandas.read_csv('searchAPIApp/professorNameVectors.csv')

model = SentenceTransformer('bert-base-nli-mean-tokens')

nn = None

with open('searchAPIApp/knn.pkl', 'rb') as f:
    nn = pickle.load(f)


def search(request):
    print("Search function called")

    input_name = request.GET['name']
    input_vector = model.encode(input_name)

    distance, indices = nn.kneighbors([input_vector])

    neighbors = vectors.iloc[indices[0]]['names'].to_list()

    response = [neighbor.strip() for neighbor in neighbors]
    print(f"Search function response: {response}")

    return JsonResponse(response, safe=False)
