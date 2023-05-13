from django.urls import path

from . import views

urlpatterns = [
    path('type-overtime/', views.TypeOvertime.as_view(), name="type_overtime")
]
