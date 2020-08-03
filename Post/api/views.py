from django.shortcuts import render, HttpResponse, get_object_or_404, redirect
from django.http import JsonResponse
from django.conf import settings
from ..models import Post
from ..forms import PostForm
from django.utils.http import is_safe_url
from ..serializers import PostSerializer, PostActionSerializer, PostCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

@api_view(['GET'])
def post_detail(request, pk, *args, **kwargs):
    qs = Post.objects.filter(pk=pk)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = PostSerializer(obj)
    return Response(serializer.data, status=200)

    
@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def post_delete(request, pk, *args, **kwargs):
    qs = Post.objects.filter(pk=pk)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this post."}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Post Sucessfully Deleted."}, status=200)


@api_view(['POST'])
@authentication_classes((TokenAuthentication))
@permission_classes([IsAuthenticated])
def post_action(request, *args, **kwargs):
    """
    Required Id
    Action Options Are => Like, Unlike, Retweet
    """
    user = request.user
    print('User: ', user)
    serializer = PostActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        pk = data.get('id')
        action = data.get('action')
        content = data.get('content')
        qs = Post.objects.filter(pk=pk)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            print(obj.likes)
            # if request.user in set(obj.likes.all()):
            #     obj.likes.remove(request.user)
            #     serializer = PostSerializer(obj)
            #     return Response(serializer.data, status=200)
            # else:
            obj.likes.add(request.user)
            serializer = PostSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = PostSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "repost":
            if obj.parent:
                new_post = Post.objects.create(
                    user=request.user, 
                    parent=obj.parent,
                    text=content,
                )
            else:
                new_post = Post.objects.create(
                        user=request.user, 
                        parent=obj,
                        text=content,
                )
            print(new_post)
            serializer = PostSerializer(new_post)
            return Response(serializer.data, status=200)
    return Response({"message": "Post Sucessfully Liked."}, status=200)


@api_view(['GET'])
def post_list(request, username=None, *args, **kwargs):
    
    qs = Post.objects.all()
    
    
    if username:
        qs = qs.filter(user__username__iexact=username)
    
    serializer = PostSerializer(qs, many=True)
    response = Response(serializer.data)
    return response


@api_view(['POST'])
#  @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def post_create(request, *args, **kwargs):
    serializer = PostCreateSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)





