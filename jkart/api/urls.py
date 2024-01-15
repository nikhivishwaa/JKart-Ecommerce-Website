from django.urls import path, include 
from .views import FilesViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('files', FilesViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
