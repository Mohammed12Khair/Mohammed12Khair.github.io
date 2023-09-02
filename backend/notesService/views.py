from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes,authentication_classes,api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from rest_framework.response import Response

from knox.auth import TokenAuthentication,AuthToken

from .serializer import NotesSerializer
from .models import Notes

@api_view(['GET','POST'])
def test_service(request):
    serializer=NotesSerializer(Notes.objects.all(),many=True)
    return Response(serializer.data)
