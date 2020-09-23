from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
from .serializers import CustomProductSerializer, CategorySerializer, TransactionSerializer
from .models import Product, ProductCategory, OrderItems, Orders
from django.http import JsonResponse, HttpResponse

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = CustomProductSerializer

    


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = TransactionSerializer

       
def order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data is None:
            raise AttributeError
    
        order = Orders.objects.create(
                                    total_price=data['total_price'],
                                    payment_mode=data['payment_mode']
                                    )
        for product_id in data['product_ids']:
            OrderItems(product=Product.objects.get(pk=product_id['id']), transactions=order, quantity=product_id['quantity']).save()
        
        response_data = {order.trans_id}
        return HttpResponse(response_data, status=201)
    else:
        return HttpResponse('your api dey exposed', status=401)




@permission_classes(IsAuthenticated,)
@api_view()
def user_auth(request):
    logged_in_user = request.user.username
    return Response(data=logged_in_user,)