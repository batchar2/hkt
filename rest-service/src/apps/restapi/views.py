import os
import sys
import json
import math
import uuid
import datetime

import requests

from django.db.models import Q
from django.conf import settings
from django.db.models import Count

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import kurento
from . import serializers

class ObjectBuilderView(APIView):
    """ Список объектов """
    def get(self, request, obj_id=None):
        serializer = None
        if obj_id is None:
            objs = models.ObjectBuilder.objects.all()
            serializer = serializers.ObjectBuilderSerializers(objs, many=True)
        else:
            obj = models.ObjectBuilder.objects.get(pk=obj_id)
            serializer = serializers.ObjectBuilderDetailSerializers(obj, many=False)
        return Response(serializer.data)

    def post(self, request):
        obj = serializers.ObjectBuilderSerializers(data=request.data)
        if obj.is_valid():
            obj.save()
            return Response({'status': 'ok'});
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    def put(self, request, obj_id=None):
        obj = serializers.ObjectBuilderSerializers(data=request.data)
        if obj.is_valid():
            obj.update(obj_id=obj_id)
            return Response({'status': 'ok'});
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    def delete(self, request, obj_id=None):
        obj = models.ObjectBuilder.objects.get(pk=obj_id).delete()
        return Response({'status': 'ok'});


class CameraView(APIView):
    def get(self, request, obj_id, cam_id=None):
        serializer = None
        if cam_id is None:
            cameras = models.Camera.objects.filter(object_builder__id=obj_id)
            serializer = serializers.CameraListSerializers(cameras, many=True)
        else:
            obj = models.Camera.objects.get(pk=cam_id)
            serializer = serializers.CameraSerializers(obj, many=False)
        return Response(serializer.data)

    def post(self, request, obj_id, cam_id=None):
        obj = serializers.CameraEditCreateSerializers(data=request.data)
        if obj.is_valid():
            camera = obj.save()
            kurento.start_camera(camera_id=camera.id, camera_uri=camera.rtsp_url)
            return Response({'status': 'ok'})
        #print(obj.errors)
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, obj_id, cam_id=None):
        obj = serializers.CameraEditCreateSerializers(data=request.data)
        if obj.is_valid():
            camera = obj.update(cam_id=cam_id)

            kurento.stop_camera(camera_id=camera.id, camera_uri=camera.rtsp_url)
            kurento.start_camera(camera_id=camera.id, camera_uri=camera.rtsp_url)

            return Response({'status': 'ok'});
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, obj_id, cam_id):
        camera = models.Camera.objects.get(pk=cam_id)

        kurento.stop_camera(camera_id=camera.id, camera_uri=camera.rtsp_url)

        camera.delete()
        return Response({'status': 'ok'})



class SuperLabelView(APIView):
    def get(self, request, lbl_id=None):
        serializer = None
        if lbl_id is None:
            splabels = models.SuperLabel.objects.all()
            serializer = serializers.SuperLabelSerializers(splabels, many=True)
        else:
            splabel = models.SuperLabel.objects.get(pk=lbl_id)
            serializer = serializers.SuperLabelSerializers(splabel, many=False)
        return Response(serializer.data)

    def post(self, request):
        splabel = serializers.SuperLabelSerializers(data=request.data)
        if splabel.is_valid():
            splabel.save()
            return Response({'status': 'ok'})
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    def put(self, request, lbl_id):
        splabel = serializers.SuperLabelSerializers(data=request.data)
        if splabel.is_valid():
            splabel.update(lbl_id=lbl_id)
            return Response({'status': 'ok'});
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    def delete(self, request, lbl_id):
        models.SuperLabel.objects.get(pk=lbl_id).delete()
        return Response({'status': 'ok'})



class LabelView(APIView):
    def get(self, request, sp_lbl_id):
        serializer = None
        if sp_lbl_id is None:
            splabels = models.Label.objects.all()
            serializer = serializers.LabelSerializers(splabels, many=True)
        else:
            splabel = models.Label.objects.get(pk=sp_lbl_id)
            serializer = serializers.LabelSerializers(splabel, many=False)
        return Response(serializer.data)

    def post(self, request, sp_lbl_id):
        splabel = serializers.LabelSerializers(data=request.data)
        if splabel.is_valid():
            splabel.save()
            return Response({'status': 'ok'})
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, sp_lbl_id, lbl_id):
        splabel = serializers.LabelSerializers(data=request.data)
        if splabel.is_valid():
            splabel.update(lbl_id=lbl_id)
            return Response({'status': 'ok'});
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, sp_lbl_id, lbl_id):
        models.Label.objects.get(pk=lbl_id).delete()
        return Response({'status': 'ok'})


class ZoneView(APIView):

    def get(self, request, cam_id, zone_id=None):
        serializer = None
        if zone_id is None:
            print(cam_id)
            zones = models.Zone.objects.filter(camera__id=cam_id)
            serializer = serializers.ZoneSerializers(zones, many=True)
        else:
            zone = models.Zone.objects.get(pk=zone_id)
            serializer = serializers.ZoneSerializers(zone, many=False)
        return Response(serializer.data)

    def post(self, request, cam_id):
        zone = serializers.ZoneSerializers(data=request.data)
        if zone.is_valid():
            zone.save()
            return Response({'status': 'ok'})
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, cam_id, zone_id):
        zone = serializers.ZoneSerializers(data=request.data)
        if zone.is_valid():
            zone.update(zone_id=zone_id)
            return Response({'status': 'ok'})
        return Response({
                'status':'error',
                'msg': 'Invalid data'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, cam_id, zone_id):
        models.Zone.objects.get(pk=zone_id).delete()
        return Response({'status': 'ok'})


class WorkerCountView(APIView):
    def get(self, reuqest, cam_id):
        serializer = None
        time_threshold = datetime.datetime.now() - datetime.timedelta(seconds=100000)
        camera_frames = models.CameraFrame.objects.filter(camera__id=cam_id, created_at__gte=time_threshold).order_by('id')[:1]

        workers = {
            'zones': {
                'undef': {
                    'number': 0,
                    'name': 'Вне зон',
                }
            },
            'total': 0,
            'violations': [],
        }
        if camera_frames is not None and len(camera_frames):
            camera_frame = camera_frames[0]
            # берем списко людей
            for obj_category in camera_frame.object_categories.all():
                # считаем людей по зонам
                if obj_category.zone is None:
                    workers['zones']['undef']['number'] += 1
                else:
                    zone_name = obj_category.zone.name
                    if zone_name in workers['zones']:
                        workers['zones'][zone_name]['number'] += 1
                    else:
                        workers['zones'][zone_name] = {
                            'number': 1,
                            'name': zone_name
                        }
                workers['total'] += 1
                obj_category.violations.all()
                # считаем нарушения
                for vilation in obj_category.violations.all():
                    workers['violations'].append({
                        'label': vilation.label.label,
                        'name': vilation.label.name,
                    })
        return Response({'workers': workers})


class RegisterObjectCategoryView(APIView):
    def post(self, request):
        json_data = json.loads(request.body)
        if (not 'cameras' in json_data) and len(json_data['cameras']) == 0:
            return Response({
                    'status':'error',
                    'msg': 'Invalid data'
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        # получаю камеры
        cameras = []
        for cam in json_data['cameras']:
            camera_frame = models.CameraFrame()
            camera_frame.camera = models.Camera.objects.get(pk=cam['id'])
            camera_frame.save()

            # получаю распознаные на камерах объекты
            for oc in cam['object_categories']:
                object_category = models.ObjectCategory()
                object_category.bbox = str(oc['bbox'])
                object_category.super_label = models.SuperLabel.objects.get(pk=oc['super_label'])
                object_category.camera_frame = camera_frame
                object_category.save()
                #object_category.save(force_insert=False, force_update=False)

                #violations = []
                for v in oc['violations']:
                    print('   save v')
                    violation = models.Violation()
                    violation.probability = v['probability']
                    violation.label = models.Label.objects.get(pk=v['violation_lable_id'])
                    violation.object_category = object_category
                    violation.save()
                    #violations.append(violation)
                    #object_category.violations.add(violation, bulk=False)
                    object_category.violations.add(violation)
                object_category.save()
                print('  save o')
                #object_category.
                    #object_category.save(force_insert=False, force_update=False)
                #camera_frame.object_categories.add(object_category, bulk=False)
                #camera_frame.save(force_insert=False, force_update=False)
            camera_frame.save()
            print(' save c')
        return Response({'status': 'ok'});

class ReportView(APIView):
    def get(self, request, cam_id, year, month, day, lbl_id=None):
        numbers = []
        for hour in range(0, 23):
            date_begin = datetime.datetime(year, month, day, hour,  0,  1)
            date_end   = datetime.datetime(year, month, day, hour, 59, 59)
            #
            #cameras_frame =  Count('CameraFrame', filter=Q(created_at__gte=date_begin, created_at__lt=date_end))
            #print('cameras_frame >', cameras_frame)
            camera_frames = models.CameraFrame.objects.filter(camera__id=cam_id, created_at__gte=date_begin, created_at__lte=date_end).order_by('id')[:1]
            camera_frames_ids = [f.id for f in list(camera_frames)]
            #print(camera_frames_ids)
            object_categories = models.ObjectCategory.objects.filter(camera_frame__id__in=camera_frames_ids)
            #
            number = 0
            object_categories_ids = [f.id for f in list(object_categories)]
            if len(object_categories) != 0:
                number = math.ceil(len(object_categories_ids) / len(camera_frames_ids))
            numbers.append(number)

        return Response({'register_dates': numbers});
