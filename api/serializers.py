from .models import Product, ProductCategory, OrderItems, Orders
from rest_framework import serializers

class CustomProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class TransactionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    order_source = TransactionItemSerializer(many=True)
    class Meta:
        model = Orders
        fields = '__all__'
    
