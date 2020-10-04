from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from .views import ProductViewSet, CategoryViewSet, order, user_auth, TransactionViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'transactions', TransactionViewSet)


urlpatterns = [
    url('', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace ='rest_framework')),
    path('order/', order, name='order'),
    # path('transactions/', TransactionList, name='orders'),
    url('user-auth/', user_auth, name="user_auth")
]