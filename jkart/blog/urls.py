from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="blogHome"),
    path("about/", views.about, name="blogAbout"),
    path("search/", views.search, name="blogSearch"),
    path("impression/", views.impression, name="blogImpression"),
    path("edit/", views.edit, name="blogEdit"),
    path("pricing/", views.pricing, name="blogPricing"),
]
