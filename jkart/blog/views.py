from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'blog/index.html')

def about(request):
    return HttpResponse('blog about page')

def search(request):
    return HttpResponse('blog search page')

def impression(request):
    return HttpResponse('blog impression page')

def edit(request):
    return HttpResponse('blog edit page')

def pricing(request):
    return HttpResponse('blog pricing page')