from django.views.generic import TemplateView
from .mixin import NeverCacheMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets
# from django.shortcuts import render



# Serve Vue Application
# index_view = never_cache(TemplateView.as_view(template_name='index.html'))

class IndexView( LoginRequiredMixin, NeverCacheMixin, TemplateView):
    template_name='index.html'
    login_url = 'login/'
    redirect_field_name = "next"
