from django.urls import path
from django.conf.urls import url
from django.contrib import admin
from .views import LoginView   #, RegisterView
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'login/', LoginView.as_view(), name="Login"),
    # path(r'register/', RegisterView.as_view(), name="Register"),
    path(r'logout/', LogoutView.as_view(), name="Logout"),
]