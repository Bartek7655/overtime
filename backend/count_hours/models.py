from django.db import models
from django.contrib.auth import get_user_model


class Overtime(models.Model):
    user = models.ForeignKey(get_user_model(), related_name="user", on_delete=models.CASCADE)
    start_time = models.TimeField(null=True)
    end_time = models.TimeField(null=True)
    overtime = models.IntegerField(null=True)
    date = models.DateField()
    sickness = models.BooleanField(default=False)
    holiday = models.BooleanField(default=False)

