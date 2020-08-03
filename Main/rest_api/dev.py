from rest_framework import authentication
from django.contrib.auth import get_user_model
from accounts.models import CurrentUser

User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = CurrentUser.objects.last()
        if(qs):
            user = qs.user
        else:
            user = None
        return (user, None)