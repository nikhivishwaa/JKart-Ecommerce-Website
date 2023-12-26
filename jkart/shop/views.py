from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Contact, Order, OrderUpdate
from math import ceil
import json
from django.views.decorators.csrf import csrf_exempt
from paytmchecksum import PaytmChecksum

def index(request):
    # if request.method == 'POST':
    #     print(request.POST.get('search'))
    # products = Product.objects.all()
    allprods = {}
    prod_category = Product.objects.values('sub_category')
    unique_categories = {item['sub_category'] for item in prod_category}
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
    return render(request, 'shop/product_page.html', {'product':product[0]})


def checkout(request):
    if request.method == "POST":
        order = Order()
        order.order_json = request.POST.get("order_json", "")
        order.email = request.POST.get("email", "")
        order.amount = request.POST.get("amount", "")
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
        up.update_desc = order.status
        up.time_stamp = order.order_date
        up.save()
        order_confirmation = {"confirmed": True, "status": order.status, "order_id": order.order_id}
        return render(request, 'shop/checkout.html', order_confirmation)
    return render(request, 'shop/checkout.html')


def search(request):
    return render(request, 'shop/search.html')


def tracker(request):
    if request.method == "POST":
        order_id = request.POST.get("order_id")
        email = request.POST.get("email")
        isexists = Order.objects.filter(email=email, order_id=order_id)
        try:
            if len(isexists):
                updates = []
                update = OrderUpdate.objects.filter(order_id = order_id)
                for i in update:
                    updates.append({"update":i.update_desc, "time_stamp":i.time_stamp})
                response = json.dumps([updates, isexists[0].order_json], default=str)
                return HttpResponse(response)
            else:
                return HttpResponse("{}")
        except Exception as e:
            return HttpResponse("{}")
    return render(request, 'shop/tracker.html')


def contact(request):
    if request.method == "POST":
        contact = Contact()
        contact.name = request.POST.get('name')
        contact.email = request.POST.get('email')
        contact.phone = request.POST.get('phone')
        contact.desc = request.POST.get('desc')
        contact.save()
        receipt = {"received": True, "name": contact.name}
        return render(request, 'shop/contact.html', receipt)

    return render(request, 'shop/contact.html')

@csrf_exempt
def payment(request):
    body = '{"mid":"YOUR_MID_HERE","orderId":"YOUR_ORDER_ID_HERE"}'

    #checksum that we need to verify
    Checksum = "CHECKSUM_VALUE"

    # Verify checksum
    # Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 

    isVerifySignature = PaytmChecksum.verifySignature(body, "YOUR_MERCHANT_KEY", Checksum)
    if isVerifySignature:
        print("Checksum Matched")
    else:
        print("Checksum Mismatched")
        pass