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

from django.contrib.auth.models import User


@api_view(['GET'])
def test(request):
    return Response({"data": "server"})


# User signUp view
@api_view(['POST'])
def signup(request):
    data = {}
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Save password ## hash
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()

        # Set user value
        data['user'] = serializer.data

        # Create Token for the user
        token = AuthToken.objects.create(user)

        # Set token value
        data['token'] = token[1]

        # return user object and token
        return Response(data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
