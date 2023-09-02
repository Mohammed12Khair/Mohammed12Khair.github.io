from django.urls import path
from . import views


urlpatterns = [
    path('user/test', views.test),
    path('user/signup', views.signup),
    path('user/login', views.login),
]
