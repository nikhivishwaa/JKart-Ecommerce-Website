from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'shop/index.html')

def offers(request):
    return HttpResponse('shop offers page')

def prodView(request):
    return HttpResponse('shop prodView page')

def cart(request):
    return HttpResponse('shop cart page')

def checkout(request):
    return HttpResponse('shop checkout page')