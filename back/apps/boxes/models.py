from django.db import models
from model_utils.models import SoftDeletableModel
from model_utils.models import StatusModel
from model_utils.models import TimeStampedModel
from model_utils import Choices
import logging

logger = logging.getLogger(__name__)


class Box(StatusModel, TimeStampedModel, SoftDeletableModel):
    ACTIVE = 'active'
    INACTIVE = 'inactive'

    STATUS = Choices(ACTIVE, INACTIVE)
    title = models.CharField(verbose_name='Title', max_length=255, help_text='Title Of Box')
    position_x = models.FloatField(verbose_name='position x', default=0, blank=True)
    position_y = models.FloatField(verbose_name='position y', default=0, blank=True)
    width = models.FloatField(verbose_name='box_width', default=100, blank=True, null=True)
    height = models.FloatField(verbose_name='box_height', default=100, blank=True, null=True)

    def __str__(self):
        return self.title

    def __repr__(self):
        return f'box title - {self.title} | box id - {self.id}'

    @property
    def is_active(self):
        return True if self.status and self.status == Box.ACTIVE else False

    class Meta:
        verbose_name = 'Box'
        verbose_name_plural = 'Boxes'
        ordering = ['-created']
        unique_together = ['id', 'title']
        indexes = [
            models.Index(fields=['title']),
        ]
