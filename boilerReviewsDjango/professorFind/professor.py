from django.http import JsonResponse
import sqlite3

def professor(request):

    connection = sqlite3.connect('../dbWork/data.db')

    cursor = connection.cursor()

    name = request.GET['name']

    data = cursor.execute(f'SELECT * FROM professors WHERE name = "{name}"').fetchone()

    connection.close()

    return JsonResponse(data, safe=False)