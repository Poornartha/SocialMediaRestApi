from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Post
from rest_framework.test import APIClient

User = get_user_model()

# Create your tests here.

class PostTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='abc', password='somepass')
        

    def test_post_created(self):
        user = User.objects.get(username='abc')
        post_obj = Post.objects.create(text='my post', user=user)
        self.assertEqual(post_obj.id, 1)
        self.assertEqual(post_obj.user, self.user)

    def test_api_login(self):
        client = APIClient()
        client.login(username='abc', password='somepass')

    