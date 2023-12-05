"""
football_api_page.py

This module contains the FootballAPIPage class, which encapsulates the functionalities 
for interacting with the Football API. It provides methods to perform HTTP requests to 
various endpoints of the Football API, including fetching competitions, accessing 
non-existent resources, and handling unauthorized requests. This class is designed to 
be used in test automation for validating the Football API's responses under different 
scenarios.

Classes:
    FootballAPIPage: Encapsulates methods for interacting with the Football API.
"""

import random
import string

import requests


class FootballAPI:
    """
    A page object class for interacting with the Football API.

    This class provides methods to make HTTP requests to the Football API. It includes 
    functionalities for getting competitions, accessing a non-existent endpoint, and 
    making unauthorized requests.

    Attributes:
        BASE_URL (str): Base URL of the Football API.
    """

    BASE_URL = "https://api.football-data.org/v4"

    def get_competitions(self):
        """
        Sends a GET request to the competitions endpoint of the Football API.

        Returns:
            Response: The response object from the API request.
        """
        return requests.get(f"{self.BASE_URL}/competitions")

    def get_nonexistent(self):
        """
        Sends a GET request to a non-existent endpoint of the Football API.

        This method is used to test the API's handling of requests to 
        invalid endpoints.

        Returns:
            Response: The response object from the API request.
        """
        return requests.get(f"{self.BASE_URL}/non-existent")

    def get_competitions_unauthorized(self):
        """
        Sends a GET request to the competitions endpoint with an 
        unauthorized token.

        This method is used to test the API's response to unauthorized 
        access attempts.

        Returns:
            Response: The response object from the API request.
        """
        token = ''.join(random.choices(
            string.ascii_letters + string.digits, k=32))
        headers = {"X-Auth-Token": token}
        return requests.get(f"{self.BASE_URL}/competitions", headers=headers)
