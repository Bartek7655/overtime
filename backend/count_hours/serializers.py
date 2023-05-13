from rest_framework import serializers
from .models import Overtime


class OvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overtime
        fields = ('user', 'overtime', 'date')
