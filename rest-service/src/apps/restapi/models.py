import base64
import datetime

from django.db import models
from rest_framework import serializers

class ObjectBuilder(models.Model):
    ''' Объект наблюдения '''
    name = models.CharField('Название', max_length=255)
    picture = models.ImageField('Изображение',
                                    upload_to='restapi/',
                                    blank=True,
                                    default=None)
    def __str__(self):
        return self.name


class Camera(models.Model):
    ''' Камера '''
    name = models.CharField('Название', max_length=255)
    rtsp_url = models.CharField('RTSP-URL', max_length=512)
    is_active = models.BooleanField('Активная камера', default=True)

    object_builder = models.ForeignKey(ObjectBuilder,
                                        related_name="cameras",
                                        on_delete=models.CASCADE,
                                        blank=True,
                                        default=None)

    position_coords  = models.CharField('Позиция на карте',
                                            max_length=512,
                                            blank=True,
                                            default='')#JSONField('Позиция на карте')
    json_graph_model = models.CharField('Граф',
                                            max_length=10240,
                                            blank=True,
                                            default='')#JSONField('Граф')
    screenshot = models.ImageField('Скриншот',
                                    upload_to='restapi/',
                                    blank=True,
                                    default=None)
    fps = models.IntegerField('FPS',
                                    blank=True,
                                    default=0)
    # resolution = models.CharField('Resolution', default) {
    # bitrate:
    threshold = models.FloatField('threshold',
                                    blank=True,
                                    default=0.5)
    def __str__(self):
        return self.name


class Zone(models.Model):
    ''' Зоны наблюдения '''
    name = models.CharField('Название', max_length=255, blank=True)
    color_hex = models.CharField('Цвет', max_length=255, blank=False, default="#ff000088")
    x = models.IntegerField(blank=False)
    y = models.IntegerField(blank=False)
    width = models.IntegerField(blank=False)
    height = models.IntegerField(blank=False)

    camera = models.ForeignKey(Camera,
                                related_name='view_zones',
                                on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class SuperLabel(models.Model):
    ''' Супер класс, характеризующий объект: человек, машина, животное '''
    name = models.CharField('Название', max_length=255, blank=True)
    label = models.CharField('Label', max_length=255, blank=True)

    def __str__(self):
        return self.name


class Label(models.Model):
    ''' Нарушение, которое детектируется '''
    name = models.CharField('Название', max_length=255)
    label = models.CharField('Label', max_length=255)

    def __str__(self):
        return self.name


class CameraFrame(models.Model):
    ''' Видеокадр к которому привязаны все события '''
    camera = models.ForeignKey(Camera,
                                related_name='event_frames',
                                on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.datetime.now())

    def __str__(self):
        return '{}'.format(self.id)


class ObjectCategory(models.Model):
    ''' Объект, который был распознан - человек, машина, etc '''
    bbox = models.CharField(max_length=255, blank=False)
    super_label = models.ForeignKey(SuperLabel,
                                related_name='events',
                                on_delete=models.CASCADE,
                                blank=True,
                                default=None)

    camera_frame = models.ForeignKey(CameraFrame,
                                related_name='object_categories',
                                on_delete=models.CASCADE,
                                blank=True,
                                default=None)

    zone = models.ForeignKey(Zone,
                                related_name='object_categories',
                                on_delete=models.CASCADE,
                                blank=True,
                                null=True)
    def __str__(self):
        return '{}'.format(self.id)


class Violation(models.Model):
    ''' Зарегистрированое нарушение '''
    probability = models.FloatField('Вероятность', default=0, blank=False)

    label = models.ForeignKey(Label,
                                related_name='violations',
                                on_delete=models.CASCADE)

    object_category = models.ForeignKey(ObjectCategory,
                                related_name='violations',
                                on_delete=models.CASCADE,
                                blank=True,
                                default=None)
    def __str__(self):
        return '{}'.format(self.id)
