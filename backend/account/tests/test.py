from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model


class TestViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = 'testtest32113'
        self.user = get_user_model().objects.create_user(
            email="premade@test.com",
            password=self.password
        )
        self.user.is_active = True
        self.user.save()
        self.token = None

    def signin(self, client):
        response = client.post(reverse('signin'), {
            "email": self.user.email,
            "password": self.password
        })
        self.token = response.data.get('access')
        return client

    def test_register_view(self):
        response = self.client.post(reverse('signup'), {
            "email": "test@test.com",
            "password": "testing132",
            "password2": "testing132"
        })
        self.assertEqual(response.status_code, 201)

    def test_signin_view(self):
        response = self.client.post(reverse('signin'), {
            "email": self.user.email,
            "password": self.password
        })

        self.assertEqual(response.status_code, 200)

    def test_signout_view(self):
        client = self.signin(self.client)

        client.credentials(HTTP_AUTHORIZATION=f"JWT {self.token}")
        response = client.post(reverse('signout'))

        self.assertEqual(response.status_code, 205)



