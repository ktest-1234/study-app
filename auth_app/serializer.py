from rest_framework.serializers import ModelSerializer
from .models import User, Profile

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'profile_name', 'profile_pic', 'profile_description')