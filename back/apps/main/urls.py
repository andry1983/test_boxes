from django.urls import re_path
from main.views import (
    index
)

urlpatterns = [
    re_path('^$|^[a-zA-Z0-9_-]+$', index),
]
