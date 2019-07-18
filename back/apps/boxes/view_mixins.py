from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from boxes.models import Box

class BoxUpdateApiViewMixin(generics.GenericAPIView):

    def put(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(data=request.data, instance=obj)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if not serializer.errors:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.delete()
        return Response({"message": "successfully deleted"}, status=status.HTTP_200_OK)



class AllBoxesDeleteViewMixin(generics.DestroyAPIView):

    def delete(self, request, *args, **kwargs):
        queryset = Box.objects.all()
        [box.delete() for box in queryset]
        return Response({"message": "successfully deleted all boxes"}, status=status.HTTP_200_OK)
