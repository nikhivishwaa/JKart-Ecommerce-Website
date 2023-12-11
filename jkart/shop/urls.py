from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="shopHome"),
    path("checkout/", views.checkout, name="shopCheckout"),
    path("offers/", views.offers, name="shopOffers"),
    path("products/<int:id>", views.prodView, name="shopProductView"),
    path("cart/", views.checkout, name="shopCart"),
    path("add/", views.addProduct, name="addProduct"),
    path("search/", views.search, name="search"),
    path("track/", views.tracker, name="tracker"),
    path("contact/", views.contact, name="contact"),
]
