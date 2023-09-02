from django.urls import path
from . import views
from knox.views import LogoutView, LogoutAllView


urlpatterns = [
    path('user/test', views.test),
    path('user/signup', views.signup),
    path('user/login', views.login),
    path('user/logout', LogoutView.as_view()),
    path('user/logout-all', LogoutAllView.as_view()),
    path('user/token_authication_check', views.token_authication_check),
]
