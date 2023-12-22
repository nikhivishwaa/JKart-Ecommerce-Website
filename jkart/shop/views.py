from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Contact, Order, OrderUpdate
from math import ceil

def index(request):
    # if request.method == 'POST':
    #     print(request.POST.get('search'))
    # products = Product.objects.all()
    allprods = {}
    prod_category = Product.objects.values('sub_category')
    unique_categories = {item['sub_category'] for item in prod_category}
    print(prod_category)
    for _category_ in unique_categories:
        products = Product.objects.filter(sub_category= _category_)
        n = len(products)
        no_of_slides = n//4 + ceil(n/4 - n//4)
        params = {"no_of_slides" : no_of_slides, "range": range(1, no_of_slides), "products": products}
        allprods[_category_] = params

    params = {'allprod': allprods}
    return render(request, 'shop/home.html', params)

def addProduct(request):
    if request.method == 'POST':
        pr1 = Product()
        pr1.product_name = request.POST.get('name')
        pr1.product_description =  request.POST.get('desc')
        pr1.category =  request.POST.get('category')
        pr1.sub_category =  request.POST.get('sub-category')
        pr1.publish_date =  request.POST.get('publish-date')
        # print(request.FILES)
        pr1.price =  request.POST.get('price')
        pr1.image =  request.FILES.get('image')
        pr1.save()
        return HttpResponse('<h1>Product added Successfully</h1>')
    params = {"message":"Product added Successfully"}
    return render(request, 'shop/addproducts.html', params)

def offers(request):
    return render(request, 'shop/offers.html')

def prodView(request, id):
    product = Product.objects.filter(id=id)
    print(product)
    return render(request, 'shop/product_page.html', {'product':product[0]})

def checkout(request):
    if request.method == "POST":
        order = Order()
        order.order_json = request.POST.get("order_json", "")
        order.email = request.POST.get("email", "")
        order.phone = request.POST.get("phone", "")
        order.address = request.POST.get("address1", "") + " " + request.POST.get("address2", "")
        order.name = request.POST.get("name", "")
        order.state = request.POST.get("state", "")
        order.city = request.POST.get("city", "")
        order.zipcode = request.POST.get("zipcode", "")
        order.status = "confirmed"
        order.save()

        up = OrderUpdate()
        up.order_id = order.order_id
        up.update = order.status
        up.save()

        order_confirmation = {"confirmed": True, "status": order.status, "order_id": order.order_id}
        return render(request, 'shop/checkout.html', order_confirmation)
    return render(request, 'shop/checkout.html')

def search(request):
    return render(request, 'shop/search.html')

def tracker(request):
    return render(request, 'shop/tracker.html')

def contact(request):
    if request.method == "POST":
        cantact = Contact()
        cantact.name = request.POST.get('name')
        cantact.email = request.POST.get('email')
        cantact.phone = request.POST.get('phone')
        cantact.desc = request.POST.get('desc')
        cantact.save()
        return HttpResponse('<h1>Message Submitted Successfully</h1>')
    return render(request, 'shop/contact.html')