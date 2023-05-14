from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import RegisterSerializer


class RegisterView(CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer


class TestApi(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        print(request)
        return Response('test')
