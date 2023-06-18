from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from ...count_hours.models import Overtime


class TestViews(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = 'testtest123'
        self.user = get_user_model().objects.create_user(
            email='premade@test.com',
            password=self.password,
            is_active=True
        )
        self.token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"JWT {self.token}")

    def test_add_overtime(self):
        data = [
            {
                "date": "12.11.2011",
                "overtime": 300
            },
            {
                "date": "11.11.2011",
                "overtime": 200
            }
        ]
        response = self.client.post(reverse('type_overtime'), data=data, format="json")
        self.assertEqual(response.status_code, 201)
        # all_objects = Overtime.objects.all()
        # self.assertEqual(all_objects.count(), len(data))

