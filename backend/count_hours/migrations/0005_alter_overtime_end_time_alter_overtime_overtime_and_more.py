# Generated by Django 4.2.1 on 2023-07-09 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('count_hours', '0004_overtime_holiday_overtime_sickness'),
    ]

    operations = [
        migrations.AlterField(
            model_name='overtime',
            name='end_time',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='overtime',
            name='overtime',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='overtime',
            name='start_time',
            field=models.TimeField(null=True),
        ),
    ]
