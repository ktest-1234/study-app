from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet

user_router = DefaultRouter()
user_router.register(r'users', UserViewSet)

profile_router = DefaultRouter()
profile_router.register(r'profiles', ProfileViewSet)