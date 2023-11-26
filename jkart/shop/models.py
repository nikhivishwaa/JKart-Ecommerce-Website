from django.db import models

# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    product_description = models.CharField(max_length=300)
    category = models.CharField(max_length=30,default="")  # default argument fill the null fields of prev table
    sub_category = models.CharField(max_length=50,default="")
    publish_date = models.DateField()
    price = models.IntegerField(default=0)
    image = models.ImageField(upload_to='shop/images',default="")

    def __str__(self):
        return self.product_name
    