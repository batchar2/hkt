import six
import uuid
import json
import base64
import datetime

import imghdr

from rest_framework import serializers
from django.core.files.base import ContentFile

from . import models

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """
    def to_internal_value(self, data):
        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')
            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')
            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = "%s.%s" % (file_name, file_extension, )
            data = ContentFile(decoded_file, name=complete_file_name)
        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension
        return extension


class CameraListSerializers(serializers.ModelSerializer):
    screenshot = Base64ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model = models.Camera
        fields = ('id', 'name', 'screenshot', 'threshold', 'position_coords')



class ObjectBuilderSerializers(serializers.ModelSerializer):
    """ Object list """
    picture = Base64ImageField(
        max_length=None, use_url=True,
    )

    def update(self, obj_id):
        obj = None
        try:
            obj = models.ObjectBuilder.objects.get(id=obj_id)
        except ObjectDoesNotExist:
            return False

        obj.name = self.validated_data.get('name')
        obj.picture = self.validated_data.get('picture')
        obj.save()
        return True

    class Meta:
        model = models.ObjectBuilder
        fields = ('id', 'name', 'picture')



class ObjectBuilderDetailSerializers(serializers.ModelSerializer):
    """ Object list """
    cameras = CameraListSerializers(many=True)
    picture = Base64ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model = models.ObjectBuilder
        fields = ('id', 'name', 'picture', 'cameras')


class CameraSerializers(serializers.ModelSerializer):
    """ Object list """
    screenshot = Base64ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model = models.Camera
        fields = ('id',
                    'name',
                    'rtsp_url',
                    'is_active',
                    'object_builder',
                    'position_coords',
                    'json_graph_model',
                    'screenshot',
                    'fps',
                    'threshold'
                )


class CameraEditCreateSerializers(serializers.ModelSerializer):
    """ Object list """

    def update(self, cam_id):
        camera = None
        try:
            camera = models.Camera.objects.get(id=cam_id)
        except ObjectDoesNotExist:
            return False

        camera.name = self.validated_data.get('name')
        camera.rtsp_url = self.validated_data.get('rtsp_url')
        camera.is_active = self.validated_data.get('is_active')
        #camera.object_builder = self.validated_data.get('object_builder')
        camera.json_graph_model = self.validated_data.get('json_graph_model')
        camera.fps = self.validated_data.get('fps')
        camera.threshold = self.validated_data.get('threshold')

        return camera.save()
        
    class Meta:
        model = models.Camera
        fields = ('id',
                    'name',
                    'rtsp_url',
                    'is_active',
                    'object_builder',
                    'position_coords',
                    'json_graph_model',
                    'fps',
                    'threshold'
                )


class SuperLabelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.SuperLabel
        fields = ('id', 'name', 'label')

    def update(self, lbl_id):
        obj = None
        try:
            obj = models.SuperLabel.objects.get(id=lbl_id)
        except ObjectDoesNotExist:
            return False
        obj.name = self.validated_data.get('name')
        obj.label = self.validated_data.get('label')
        obj.save()
        return True


class LabelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Label
        fields = ('id', 'name', 'label',)

    def update(self, lbl_id):
        obj = None
        try:
            obj = models.Label.objects.get(id=lbl_id)
        except ObjectDoesNotExist:
            return False
        obj.name = self.validated_data.get('name')
        obj.label = self.validated_data.get('label')
        obj.save()
        return True


class CameraFrameSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.CameraFrame
        fields = ('camera',)


class ObjectCategorySerializers(serializers.ModelSerializer):
    super_label = SuperLabelSerializers()
    camera_frame = CameraFrameSerializers()
    class Meta:
        model = models.ObjectCategory
        fields = ('bbox', 'super_label', 'camera_frame')


class ViolationySerializers(serializers.ModelSerializer):
    label = LabelSerializers()
    object_category = ObjectCategorySerializers()
    class Meta:
        model = models.Violation
        fields = ('probability', 'label', 'object_category')


class ZoneSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Zone
        fields = ('name', 'color_hex', 'x', 'y', 'width', 'height', 'camera')

    def update(self, zone_id):
        obj = None
        try:
            obj = models.Zone.objects.get(id=zone_id)
        except ObjectDoesNotExist:
            return False
        obj.name = self.validated_data.get('name')
        obj.color_hex = self.validated_data.get('color_hex')
        obj.x = self.validated_data.get('x')
        obj.y = self.validated_data.get('y')
        obj.width = self.validated_data.get('width')
        obj.height = self.validated_data.get('height')

        obj.save()
        return True



"""
{
    "cameras": [
        {
            "id": 1,
            "object_categories": [
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                },
                {
                    "super_label": 1,
                    "bbox": [1, 2, 3, 4],
                    "violations": [
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        },
                        {
                            "violation_lable_id": 1,
                            "probability": 0.1
                        }
                    ]
                }
            ]
        }
    ]
}


"""




#
# class CameraFrameSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = models.CameraFrame
#         fields = ('id', 'camera')
#
# class ObjectCategorySerializers(serializers.ModelSerializer):
#     class Meta:
#         model = models.ObjectCategory
#         fields = ('id', 'super_label', 'camera_frame')
#
# class Violation(serializers.ModelSerializer):
#     class Meta:
#         pass
