import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.http import HttpRequest
from .models import StudyUser
from asgiref import sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.access_user_ID = self.scope['url_route']['kwargs']['access_user_ID']
        self.room_group_name: str = f'chat_{self.access_user_ID}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print(f'Sucessfully connected to the following room group: {self.channel_name}')

    async def disconnect(self, close_code):
        print(f'Disconnecting {self.channel_name}, {close_code=}')

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        print('Websocket succesfully disconnected')

    async def receive(self, text_data = None, bytes_data = None):
        print(f'Received data: {text_data}')
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"message.send",
                "message":"successfull"
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({'message':message}))
