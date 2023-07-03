from rest_framework import serializers
from .models import Overtime


class OvertimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Overtime
        fields = ('overtime', 'date', "user", "start_time", "end_time", "holiday", "sickness")
