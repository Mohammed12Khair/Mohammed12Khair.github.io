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
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from datetime import datetime


@api_view(['GET'])
def test(request) -> Response:
    '''
    test view to check endpoints 
    '''
    return Response({"data": "server"})


# User signUp view
@api_view(['POST'])
def signup(request) -> Response:
    '''
    to register new user
    '''
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


@api_view(['POST'])
def login(request) -> Response:
    '''
    login action to get token
    '''
    data = {}
    # if user not found in User model return 404
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        # If wrong password
        data['error'] = 'Invalid username or Password'
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)

    # set token value
    token = AuthToken.objects.create(user)
    data['token'] = token[1]

    # set user value
    serializer = UserSerializer(instance=user)
    data['user'] = serializer.data
    print(datetime.now(), f"User {serializer.data}  loged in")

    return Response(data, status=status.HTTP_200_OK)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def token_authication_check(request) -> Response:
    '''
    check token validation     
    '''
    data = {}
    data['status'] = f"{request.user.username} is authenticated"
    return Response(data, status=status.HTTP_200_OK)
