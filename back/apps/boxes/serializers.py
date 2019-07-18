from rest_framework import serializers
from .models import (
    Box
)


class BoxSimpleSerializer(serializers.ModelSerializer):
    x = serializers.FloatField(source='position_x')
    y = serializers.FloatField(source='position_y')
    statusActive = serializers.BooleanField(source='status', default=False)

    class Meta:
        model = Box
        fields = (
            'id',
            'statusActive',
            'x',
            'y',
            'width',
            'height'
        )
