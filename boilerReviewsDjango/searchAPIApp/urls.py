from django.urls import path
from .search import search

urlpatterns = [
    path('search/', search, name='search'),
]