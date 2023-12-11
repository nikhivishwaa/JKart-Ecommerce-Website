from django.shortcuts import render
from django.http import HttpResponse
from .models import Product
from math import ceil

def index(request):
    # if request.method == 'POST':
    #     print(request.POST.get('search'))

    products = Product.objects.all()
    n = len(products)
    no_of_slides = n//4 + ceil(n/4 - n//4)
    params = {"no_of_slides" : no_of_slides, "range": range(1, no_of_slides), "products": products}
    return render(request, 'shop/home.html', params)

def addProduct(request):
    if request.method == 'POST':
        pr1 = Product()
        pr1.product_name = request.POST.get('name')
        pr1.product_description =  request.POST.get('desc')
        pr1.category =  request.POST.get('category')
        pr1.sub_category =  request.POST.get('sub-category')
        pr1.publish_date =  request.POST.get('publich-date')
        pr1.price =  request.POST.get('price')
        # pr1.image =  request.POST.get('name')

        pr1.save()
    params = {"message":"Product added Successfully"}
    print(request)
    return render(request, 'shop/addproducts.html', params)

def offers(request):
    return render(request, 'shop/offers.html')

def prodView(request, id):
    product = Product.objects.filter(id=id)
    print(product)
    return render(request, 'shop/product_page.html', {'product':product[0]})

def checkout(request):
    return render(request, 'shop/checkout.html')

def search(request):
    return render(request, 'shop/search.html')

def tracker(request):
    return render(request, 'shop/contact.html')
    # return render(request, 'shop/tracker.html')
