from django.shortcuts import render
from django.http import JsonResponse

def search(request):
    data = {"message": "Hello, world!"}
    return JsonResponse(data)