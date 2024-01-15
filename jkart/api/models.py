from django.db import models


class Files(models.Model):
    file = models.FileField(upload_to="cloud/files")
    uploaded_on = models.DateTimeField(auto_now=True)
