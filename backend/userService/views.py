from django.shortcuts import render
##
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from .serializer import UserSerializer
from rest_framework.authentication import SessionAuthentication
from knox.auth import AuthToken, TokenAuthentication


@api_view(['GET'])
def test(request):
    return Response({"data": "server"})
