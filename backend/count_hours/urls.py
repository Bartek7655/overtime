from django.urls import path

from . import views


urlpatterns = [
    path('type-overtime/', views.TypeOvertime.as_view(), name="type_overtime"),
    path('get-overtime/', views.GetOvertime.as_view(), name="get_overtime"),
    path('get-overtime/<int:month>/<int:year>/', views.GetOvertime.as_view(), name="get_overtime"),
]

