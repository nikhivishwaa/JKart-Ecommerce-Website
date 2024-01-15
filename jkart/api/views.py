from rest_framework.viewsets import ModelViewSet
from .serializer import FileSerializer, Files
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class FilesViewSet(ModelViewSet):
    serializer_class = FileSerializer
    queryset = Files.objects.all()