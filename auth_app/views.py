from rest_framework.viewsets import ModelViewSet
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
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

    @action(methods=['delete'], detail=False)
    def logout(self, request, pk=None): # HTTP DELETE method / logging out the current user
        response = Response({"message":"Logged out successfully"}, status=HTTP_200_OK)

        refresh = RefreshToken(request.COOKIES.get("refresh_token"))
        refresh.blacklist() # This blacklists the refresh token so that it can't be used to refresh the access token again

        response.delete_cookie(
            "access_token",
            path='/',
            samesite='Lax'
        )
        response.delete_cookie(
            "refresh_token",
            path='/',
            samesite='Lax'
        )

        return response


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access_token = serializer.validated_data['access']
        refresh_token = serializer.validated_data['refresh']

        response = Response({"message":"Authentication tokens are set"}, status=HTTP_201_CREATED)

        response.set_cookie(
            "access_token", 
            access_token, 
            httponly=True,
            secure=True,
            samesite='Lax',
            path='/'
        )

        response.set_cookie(
            "refresh_token", 
            refresh_token, 
            httponly=True,
            secure=True,
            samesite='Lax',
            path='/'
        )

        return response

class CustomTokenRefreshPairView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data={"refresh":request.COOKIES.get('refresh_token')})
        serializer.is_valid(raise_exception=True)

        access_token = serializer.validated_data['access']

        response = Response({"message":"Access token refreshed"}, status=HTTP_200_OK)

        response.set_cookie(
            "access_token", 
            access_token, 
            httponly=True,
            secure=True,
            samesite='Lax',
            path='/'
        )

        return response

class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access_token')

        serializer = self.get_serializer(data={"token":access_token})
        serializer.is_valid(raise_exception=True)

        response = Response({"message":"Authentication tokens are valid"}, status=HTTP_200_OK)

        return response