from django.shortcuts import render
from django.shortcuts import get_object_or_404
# from django.contrib.auth.decorators import permission_required

from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework import status
from rest_framework.response import Response

from knox.auth import TokenAuthentication, AuthToken

from .serializer import NotesSerializer
from .models import Notes


@api_view(['GET', 'POST'])
def test_service(request):
    serializer = NotesSerializer(Notes.objects.all().order_by('id'), many=True)
    return Response(serializer.data)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def notes(request) -> Response:
    '''
    Get all notes list
    '''
    note: list[Notes] = Notes.objects.filter(
        owner=request.user.id).order_by('-id')
    serializer = NotesSerializer(note, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def note_new(request) -> Response:
    '''
    Create new note entry
    '''
    request.data['owner'] = request.user.id
    serializer = NotesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def note_detail(request, id) -> Response:
    '''
    Get note details
    '''
    note = get_object_or_404(Notes, id=id)
    serializer = NotesSerializer(instance=note)
    return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def note_update(request, id) -> Response:
    '''
    Update note
    '''
    note = get_object_or_404(Notes, id=id)
    request.data['owner'] = request.user.id
    serializer = NotesSerializer(instance=note, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def note_delete(request, id) -> Response:
    '''
    Delete note
    '''
    note = get_object_or_404(Notes, id=id)
    note.delete()
    return Response(status=status.HTTP_200_OK)
