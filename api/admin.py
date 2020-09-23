from django.contrib import admin
from .models import ProductCategory, Product, OrderItems, Orders

admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(Orders)
admin.site.register(OrderItems)