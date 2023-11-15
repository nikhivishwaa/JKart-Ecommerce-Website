from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="shopHome"),
    path("checkout/", views.checkout, name="shopCheckout"),
    path("offers/", views.offers, name="shopOffers"),
    path("prodView/", views.prodView, name="shopProductView"),
    path("cart/", views.cart, name="shopCart"),
]
