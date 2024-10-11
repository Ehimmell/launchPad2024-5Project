from django.test import TestCase, Client
from django.urls import reverse

class SearchAPITestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_search(self):
        response = self.client.get(reverse('search'), {'query': 'test'})
        self.assertEqual(response.status_code, 200)