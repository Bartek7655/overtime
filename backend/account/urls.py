from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('signin/', TokenObtainPairView.as_view(), name='signin_with_token'),
    path('signup/', views.RegisterView.as_view(), name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('testapi/', views.TestApi.as_view()),
]
