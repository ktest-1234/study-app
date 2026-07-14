from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, RegisterViewSet

user_router = DefaultRouter()
user_router.register(r'auth/users', UserViewSet)

profile_router = DefaultRouter()
profile_router.register(r'auth/profiles', ProfileViewSet)

register_router = DefaultRouter()
register_router.register(r'auth/users/register', RegisterViewSet)