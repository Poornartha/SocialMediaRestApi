from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm 
from django.contrib.auth import login, logout
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import CurrentUser


# Views
def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        CurrentUser.objects.create(user=user_)
        login(request, user_)
        token, created = Token.objects.get_or_create(user=user_)
        return redirect('/')
    context = {'form': form, 
        'btn_label': 'Login',
        "title": 'Login',
    }
    return render(request, 'accounts/auth.html', context )

def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        CurrentUser.objects.get(user=request.user).delete()
        logout(request)
        return redirect('/')
    context = {
        'form': None, 
        'btn_label': 'Confirm?',
        "title": 'Logout',
    }
    return render(request, 'accounts/auth.html', context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(data=request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        # send a confirmation email to verify their account
        login(request, user)
        return redirect("/login")
    context = {
        'form': form,
        'btn_label': 'Register',
        'title': 'Register',
    }
    return render(request, 'accounts/auth.html', context)

