from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<str:access_user_ID>', consumers.ChatConsumer.as_asgi()),
]