from django.contrib import admin

# Register your models here.
from boxes.models import Box


@admin.register(Box)
class BoxAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'title', 'position_x', 'position_y', 'status',
    ]
    list_display_links = ['id']
    list_filter = ['status']
