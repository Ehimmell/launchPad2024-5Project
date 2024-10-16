from django.http import JsonResponse
import sqlite3


def classes(request):

    uuid = request.GET['uuid']
    connection = sqlite3.connect('../dbWork/data.db')

    cursor = connection.cursor()
    tableName = f'professor{uuid}classList'

    data = cursor.execute(f'SELECT * FROM {tableName}').fetchall()

    connection.close()

    return JsonResponse(data, safe=False)