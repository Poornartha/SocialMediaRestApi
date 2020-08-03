from django.contrib import admin
from django.urls import path
from .views import post_detail, post_list, post_create, post_delete, post_action
from django.views.generic import TemplateView

app_name = 'Post'

urlpatterns = [
    path('api/<int:pk>', post_detail, name='post'),
    path('api/', post_list, name='posts'),
    path('api/user/<str:username>', post_list, name='posts'),
    path('api/create', post_create, name="post_create"),
    path('api/<int:pk>/delete', post_delete, name="post_delete"),
    path('api/action', post_action, name="post_action"),
    path('react', TemplateView.as_view(template_name='Post/list.html')),
]
