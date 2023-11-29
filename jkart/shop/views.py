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
    params = {"ravi":"ravika","no_of_slides" : no_of_slides, "range": range(1, no_of_slides), "products": products}
    return render(request, 'shop/home.html', params)

def offers(request):
    return render(request, 'shop/offers.html')

def prodView(request):
    return HttpResponse('shop prodView page')

def cart(request):
    return HttpResponse('shop cart page')

def checkout(request):
    return HttpResponse('shop checkout page')