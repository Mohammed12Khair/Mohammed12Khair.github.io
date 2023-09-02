from django.urls import path

from . import views

urlpatterns = [
    path('notes/test',views.test_service)
]
