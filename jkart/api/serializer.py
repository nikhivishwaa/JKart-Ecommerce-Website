from .models import Files
from rest_framework.serializers import ModelSerializer


class FileSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Files