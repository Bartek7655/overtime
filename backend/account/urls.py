from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('signin/', TokenObtainPairView.as_view(), name='signin'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('signout/', views.SignOut.as_view(), name='signout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('testapi/', views.TestApi.as_view()),
]
