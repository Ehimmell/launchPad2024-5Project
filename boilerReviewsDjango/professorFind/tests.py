from django.test import TestCase
import requests

id = requests.get("http://127.0.0.1:8000/professorFind/professor/?name=Andrew%20Freed").json()

print(id)

id = id[3]

id = id.replace('-','')

print(requests.get(f'http://127.0.0.1:8000/professorFind/classes/?uuid={id}').json())