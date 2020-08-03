from django.shortcuts import render, HttpResponse, get_object_or_404, redirect
from django.http import JsonResponse
from django.conf import settings
from .models import Post
from .forms import PostForm
from django.utils.http import is_safe_url
from .serializers import PostSerializer, PostActionSerializer, PostCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def listed(request):
    token = ''
    if request.user.is_active:
        username = request.user.username
        user = get_object_or_404(User, username=username)
        token, created = Token.objects.get_or_create(user=user)
    else:
        username = 'Posts'
    data = username
    print('Token => ', token)
    context = {
        'username': data,
        'token': token,
    }
    print("User:", request.user)
    return render(request, 'Post/list.html', context)

def detail(request, pk):
    post_id = pk
    print(post_id)
    context = {
        'post_id': post_id,
    }
    return render(request, 'Post/detail.html', context)

def profile(request, username):
    context = {
        'username': username,
    }
    return render(request, 'Post/profile.html', context)

def home(request):
    if request.user.is_authenticated:
        username = request.user.username
    else:
        username = ''
    data = username 
    context = {
        'username': data,
    }
    print("User:", request.user)
    return render(request, 'Pages/home.html', context)