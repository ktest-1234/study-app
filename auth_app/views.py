from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Profile, User
from .serializer import ProfileSerializer, UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
