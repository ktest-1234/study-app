from rest_framework.viewsets import ModelViewSet
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Profile, User
from .serializer import ProfileSerializer, UserSerializer, CustomTokenObtainPairSerializer, CheckPasswordSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'email'
    
    def create(self, request, *args, **kwargs): # HTTP POST method / creating users
        serializer = self.get_serializer(data=request.data) # gets the serializer class
        serializer.is_valid(raise_exception=True) # make sure if the args given by the request are valid
        print(serializer) 
        user = serializer.save() # creates a SQL query to create/update a user model

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

    @action(methods=['post'], detail=False)
    def check_password(self, request, pk=None): # HTTP POST method / checking user passwords
        serializer = CheckPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first() # runs a search query - filtering by email and get the first user
        
        return serializer.check_password(user, password)

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer