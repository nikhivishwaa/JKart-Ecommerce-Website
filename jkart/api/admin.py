from django.contrib import admin
from .models import Files


@admin.register(Files)
class FilesModelAdmin(admin.ModelAdmin):
    list_display = ["id", "file", "uploaded_on"]
