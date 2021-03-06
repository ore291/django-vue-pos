from django.shortcuts import render, redirect
from django.views.generic.edit import FormView
from django.views.generic import TemplateView
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required




class LoginView(FormView):
    form_class = LoginForm
    template_name = 'panel.login.html'
    success_url = '/'

    def form_valid(self, form):
        try:
            auth = authenticate(username=form.cleaned_data.get('username'),
                                password=form.cleaned_data.get('password'))
            login_system = login(self.request, auth)

            return redirect(self.success_url)
        except Exception as e:
            
            return redirect(self.success_url)


# class RegisterView(FormView):
    # form_class = RegisterForm
    # template_name = 'panel.register.html'
    # success_url = '/'

    # def form_valid(self, form):
    #     created = form.create_user(self.request)
    #     if created:
    #         auth = authenticate(username=form.cleaned_data.get(
    #             'username'), password=form.cleaned_data.get('password1'))
    #         login_to_system = login(self.request, auth)
    #     else:
    #         messages.error(
    #             self.request, 'Could not register, please try again another time.')
    #     return super().form_valid(form)

