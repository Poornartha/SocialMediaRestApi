from rest_framework import serializers
from .models import Post
from django.conf import settings 
from django.contrib.auth.models import User
import json

MAX_POST_LENGTH = settings.MAX_POST_LENGTH
POST_ACTION_OPTIONS = settings.POST_ACTION_OPTIONS

class PostActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in POST_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a Valid Action.")
        return value


class PostCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'text', 'likes']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_text(self, value):
        if len(value) > MAX_POST_LENGTH:
            raise serializers.ValidationError('This Tweet is Way too Long. (Max Length: 300)')
        return value


class PostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    # content = serializers.SerializerMethodField(read_only=True)
    parent = PostCreateSerializer(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'text', 'likes', 'is_repost', 'parent', 'user']

    def get_likes(self, obj):
        return obj.likes.count()
    
    def get_user(self, obj):
        return obj.user.username

    # def get_content(self, obj):
    #     content = obj.content
    #     if obj.is_repost:
    #         content = obj.parent.content
    #     return content
