from django.db import models

# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=50)
    product_description = models.CharField(max_length=300)
    category = models.CharField(max_length=30,default="")  # default argument fill the null fields of prev table
    sub_category = models.CharField(max_length=50,default="")
    publish_date = models.DateField()
    price = models.IntegerField(default=0)
    image = models.ImageField(upload_to='shop/images',default="")

    def __str__(self):
        return self.product_name
    
class Contact(models.Model):
    msg_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, default="")
    desc = models.CharField(max_length=500, default="")
    phone = models.PositiveBigIntegerField(default=0)
    email = models.EmailField(default="", max_length=50)
    read_status = models.CharField(max_length=6,default="unread")
    msg_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.name + " | Recieved on: " +str(self.msg_date)
    