from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'profile_name', 'profile_pic', 'profile_description')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
