from django.db import models
from django.contrib.auth import get_user_model


class Overtime(models.Model):
    user = models.ForeignKey(get_user_model(), related_name="user", on_delete=models.CASCADE)
    overtime = models.IntegerField()
    date = models.DateField()

