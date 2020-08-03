from django.contrib import admin
from django.urls import path, include
from .views import home, detail, profile, listed
from django.views.generic import TemplateView 

app_name = 'Post'

urlpatterns = [
    path('home', listed, name="home"),
    path('list', listed, name="listed"),
    path('<int:pk>', detail, name="detail"),
    path('profile/<str:username>', profile, name="profile"),
    path('', include('Post.api.urls')),
]
