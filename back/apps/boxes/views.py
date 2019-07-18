from rest_framework import generics

from boxes.models import Box
from boxes.serializers import (
    BoxSimpleSerializer
)
from boxes.view_mixins import (
    BoxUpdateApiViewMixin,
    AllBoxesDeleteViewMixin,
)

__all__ = [
    'box_list_create_viewset',
    'box_update_delete_viewset'
]


# Create your views here.
class BoxApiView(AllBoxesDeleteViewMixin, generics.ListCreateAPIView):
    http_method_names = ('get', 'post', 'delete', 'head', 'options')
    pagination_class = None
    queryset = Box.objects
    serializer_class = BoxSimpleSerializer


class BoxUpdateDeleteApiView(BoxUpdateApiViewMixin, generics.GenericAPIView):
    http_method_names = ('delete', 'put', 'head', 'options')
    pagination_class = None
    queryset = Box.objects
    serializer_class = BoxSimpleSerializer


box_list_create_viewset = BoxApiView.as_view()
box_update_delete_viewset = BoxUpdateDeleteApiView.as_view()
