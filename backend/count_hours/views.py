from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import OvertimeSerializer
from .models import Overtime

from rest_framework.response import Response


class TypeOvertime(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = OvertimeSerializer

    def post(self, request, *args, **kwargs):
        return Response('')

    # def perform_create(self, serializer):
    #     user = self.request.user
    #
    #     serializer.save(user=user)
