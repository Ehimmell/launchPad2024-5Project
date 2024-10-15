from django.urls import path
from .professor import professor
from .classes import classes

urlpatterns = [
    path('professor/', professor, name='professor'),
    path('classes/', classes, name='classes')
]