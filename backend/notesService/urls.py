from django.urls import path

from . import views

urlpatterns = [
    path('notes/test',views.test_service),
    path('notes',views.notes),
    path('notes/new',views.note_new),
    path('notes/<int:id>',views.note_detail),
    path('notes/<int:id>/edit',views.note_update),
    path('notes/<int:id>/delete',views.note_delete),
]
