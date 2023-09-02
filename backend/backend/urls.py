from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('userService.urls')),
    path('api/', include('notesService.urls')),
]
