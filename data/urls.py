from django.urls import path
from .views import dataes
urlpatterns = [
    path('index/', dataes, name='data')
]
