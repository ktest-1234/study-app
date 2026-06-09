from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest
from json import loads

@csrf_exempt
def login_view(request: HttpRequest):
    if request.method == 'POST':
        response = loads(request.body)
        print(response)
    else:
        return JsonResponse({'message':'error'}, status=405)