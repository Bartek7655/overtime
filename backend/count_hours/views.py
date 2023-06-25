from datetime import date, datetime, timedelta
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import OvertimeSerializer
from .models import Overtime

from rest_framework.response import Response
from rest_framework import status


class TypeOvertime(CreateAPIView):
    model = Overtime
    permission_classes = (IsAuthenticated, )
    serializer_class = OvertimeSerializer

    @staticmethod
    def transform_date(date_string):
        try:
            # Parse the date string into a datetime object
            date_split = date_string.split('-')
            date_obj = date(
                int(date_split[0]),
                int(date_split[1]),
                int(date_split[2]))
            return date_obj
        except ValueError:
            # Handle any parsing errors or invalid date formats
            raise ValueError("Invalid date format")
        except AttributeError:
            # No data - return code 400
            pass

    def check_unique(self, data):
        try:
            created_object = self.model.objects.get(
                user__id=data["user"],
                date=data["date"]
            )
            return False, created_object

        except Overtime.DoesNotExist:
            return True, None

    def create(self, request, *args, **kwargs):
        overtime_data = self.request.data
        data_list = []
        for item in overtime_data:
            data = {
                "start_time": item.get('start_time'),
                "end_time": item.get('end_time'),
                "date": self.transform_date(item.get('date')),
                "overtime": item.get('overtime'),
                "user": self.request.user.id
            }
            created, created_object = self.check_unique(data)
            if created:
                data_list.append(data)
            else:
                created_object.overtime = data['overtime']
                created_object.start_time = data['start_time']
                created_object.end_time = data['end_time']
                created_object.save()

        serializer = self.get_serializer(data=data_list, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GetOvertime(ListAPIView):
    model = Overtime
    permission_classes = (IsAuthenticated, )
    serializer_class = OvertimeSerializer

    @staticmethod
    def get_date_range(month, year):
        first_day = datetime(year, month, 1)
        if month == 12:
            last_day = datetime(year, month, 31)
        else:
            last_day = datetime(year, month + 1, 1) - timedelta(days=1)
        return first_day, last_day

    def get_queryset(self):
        month = self.kwargs.get('month', None)
        year = self.kwargs.get('year', None)
        if month and year:
            first_day, last_day = self.get_date_range(month, year)
            queryset = self.model.objects.filter(
                user__id=self.request.user.id,
                date__range=[first_day, last_day]
            )
        else:
            queryset = self.model.objects.filter(user__id=self.request.user.id)
        return queryset

