from django.urls import path, re_path
from boxes.views import (
    box_list_create_viewset,
    box_update_delete_viewset,
)

urlpatterns = [

    path('boxes/', box_list_create_viewset),
    re_path('boxes/(?P<pk>\d+)', box_update_delete_viewset),

]
