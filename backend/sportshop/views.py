from django.shortcuts import render
from django.http import JsonResponse
from .models import Category, Product

def get_categories(request):
    categories = list(Category.objects.values('id', 'name', 'image_url'))
    return JsonResponse(categories, safe=False)

def get_products(request):
    category_name = request.GET.get('category', None)
    products_qs = Product.objects.all()
    if category_name:
        products_qs = products_qs.filter(category__name__iexact=category_name)
    
    # Returning a basic list of dictionaries
    products = list(products_qs.values(
        'id', 'name', 'description', 'price', 'image', 'stock', 
        'category__name', 'subcategory'
    ))
    return JsonResponse(products, safe=False)
