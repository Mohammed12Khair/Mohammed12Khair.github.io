from django.urls import path
from . import views


urlpatterns = [
    path('user/test', views.test)
]
