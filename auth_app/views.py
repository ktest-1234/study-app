from django.http import JsonResponse

def test_view(request):
    response = JsonResponse({
        "message": "Hello from Django"
    })

    response["Access-Control-Allow-Origin"] = "*"

    return response
