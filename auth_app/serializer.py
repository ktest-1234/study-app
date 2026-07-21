from rest_framework.serializers import ModelSerializer
from .models import User, Profile
from django.contrib.auth import get_user_model

UserModel = get_user_model() # Get user model from AUTH_USER_MODEL in settings

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        if validated_data['is_staff'] and validated_data['is_superuser']:
            return UserModel.objects.create_user(**validated_data)
        else:
            raise Exception('Must have is_superuser and is_staff to true')


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'profile_name', 'profile_pic', 'profile_description')
