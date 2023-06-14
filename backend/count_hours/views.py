from datetime import date
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import OvertimeSerializer
from .models import Overtime

from rest_framework.response import Response
from rest_framework import status


class TypeOvertime(CreateAPIView):
    model = Overtime
    permission_classes = (IsAuthenticated, )
    serializer_class = OvertimeSerializer

    def post(self, request, *args, **kwargs):
        print('test')

        return super().post(request, *args, **kwargs)

    @staticmethod
    def transform_date(date_string):
        try:
            # Parse the date string into a datetime object
            date_split = date_string.split('.')
            date_obj = date(
                int(date_split[2]),
                int(date_split[1]),
                int(date_split[0]))
            return date_obj
        except ValueError:
            # Handle any parsing errors or invalid date formats
            raise ValueError("Invalid date format")

    def create(self, request, *args, **kwargs):
        overtime_data = self.request.data
        data_list = []
        for item in overtime_data:
            data = {
                "date": self.transform_date(item['date']),
                "overtime": item['overtime'],
                "user": self.request.user.id
            }
            data_list.append(data)

        serializer = self.get_serializer(data=data_list, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
