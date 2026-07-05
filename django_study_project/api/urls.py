from rest_framework.routers import DefaultRouter
from auth_app.urls import user_router, profile_router
from django.urls import path, include

router = DefaultRouter()
router.registry.extend(user_router.registry)
router.registry.extend(profile_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
