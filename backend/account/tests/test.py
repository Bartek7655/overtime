from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase


class TestViews(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = 'testtest32113'
        self.user = get_user_model().objects.create_user(
            email="premade@test.com",
            password=self.password,
            is_active=True
        )
        self.token = None

    def signin(self, client):
        response = client.post(reverse('signin'), {
            "email": self.user.email,
            "password": self.password
        })

        return client, response

    def test_register_view(self):
        response = self.client.post(reverse('signup'), {
            "email": "test@test.com",
            "password": self.password,
            "password2": self.password
        })
        self.assertEqual(response.status_code, 201)

    def test_signin_view(self):
        response = self.client.post(reverse('signin'), {
            "email": self.user.email,
            "password": self.password
        })

        self.assertEqual(response.status_code, 200)

    def test_signout_view(self):
        client, response = self.signin(self.client)

        client.credentials(HTTP_AUTHORIZATION=f"JWT {response.data.get('access')}")
        response = client.post(reverse('signout'))

        self.assertEqual(response.status_code, 205)

    def test_refresh_token(self):
        client, response = (self.signin(self.client))

        response = client.post(reverse('token_refresh'), {'refresh': response.data.get('refresh')})
        self.assertEqual(response.status_code, 200)

        client.credentials(HTTP_AUTHORIZATION=f"JWT {response.data.get('access')}")
        response = client.post(reverse('test_authenticated'))
        self.assertEqual(response.status_code, 200)


