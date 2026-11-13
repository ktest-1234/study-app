from rest_framework.viewsets import ModelViewSet
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .models import Profile, User
from .serializer import ProfileSerializer, UserSerializer, CustomTokenObtainPairSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs): # HTTP POST method
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

    def retrieve(self, request, *args, **kwargs): # HTTP GET method
        user = self.get_object()
        password = request.data.get('password')
        if not password:
            return Response(data={
                "user":request.data,
                "is_password_correct":False,
                "message":"Password not valid"
            }, status=HTTP_400_BAD_REQUEST)
        
        if not user.check_password(password):
            return Response(data={
                "user":request.data,
                "is_password_correct":False,
                "message":"User password is incorrect"
            }, status=HTTP_401_UNAUTHORIZED)
        
        return Response(data={
            "user":request.data,
            "is_password_correct":True,
            "message":"User password is correct"
        }, status=HTTP_201_CREATED)

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer