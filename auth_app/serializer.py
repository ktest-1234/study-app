from rest_framework.serializers import ModelSerializer
from .models import User, Profile
from django.contrib.auth import get_user_model

UserModel = get_user_model() # Get user model from AUTH_USER_MODEL in settings

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'profile_name', 'profile_pic', 'profile_description')


class RegisterSerializer(ModelSerializer):
    class Meta:
        mdoel = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user