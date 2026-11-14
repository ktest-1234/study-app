from rest_framework.serializers import ModelSerializer, Serializer, CharField, EmailField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from rest_framework.response import Response
from .models import User, Profile

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        print(f'Validated data : {validated_data}')
        return self.Meta.model.objects.create_user(
            username=validated_data.get('username'),
            email=validated_data.get('email', ''),
            password=validated_data.get('password')
        )

class CheckPasswordSerializer(Serializer):
    email = EmailField(required=True)
    password = CharField(write_only=True, required=True)

    def check_password(self, user: User, password: str):
        if not user:
            return Response(data={
                "is_password_correct":False,
                "message":"User with given email is not found"
            }, status=HTTP_400_BAD_REQUEST)
        
        if not password:
            return Response(data={
                "is_password_correct":False,
                "message":"Password not provided"
            }, status=HTTP_400_BAD_REQUEST)
        
        if not user.check_password(password):
            return Response(data={
                "is_password_correct":False,
                "message":"User password is incorrect, unable to authenticate"
            }, status=HTTP_401_UNAUTHORIZED)
        
        return Response(data={
            "is_password_correct":True,
            "message":"User password is correct, successfully authenticated"
        }, status=HTTP_200_OK)

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'profile_name', 'profile_pic', 'profile_description')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
