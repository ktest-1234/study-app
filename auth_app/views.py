from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.status import HTTP_201_CREATED
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from .models import Profile, User
from .serializer import ProfileSerializer, UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) # gets the serializer class while adding contexts to it
        serializer.is_valid(raise_exception=True) # make sure it is valid
        print(serializer) 
        user = serializer.save() # creates a model with the data given

        refresh_token = RefreshToken.for_user(user) # creates a refresh token for the user

        tokens = {
            "refresh":str(refresh_token),
            "access":str(refresh_token.access_token)
        }

        response = Response(data={
            "user":serializer.data,
            "tokens":tokens,
            "Message":"User created successfully",
        }, status=HTTP_201_CREATED)

        return response
        

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    
