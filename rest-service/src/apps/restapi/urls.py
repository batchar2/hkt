from django.urls import path, include, re_path

from . import views

urlpatterns = [
    ################# object
    # objects list, detail [get]
    path('objects/list', views.ObjectBuilderView.as_view(), name='objects_list'),
    # object create [post]
    path('object/create', views.ObjectBuilderView.as_view(), name='object_create'),
    # object information [get put delete]
    path('object/<int:obj_id>', views.ObjectBuilderView.as_view(), name='object_detail'),

    ################## camera
    # camera [get]
    path('object/<int:obj_id>/cameras', views.CameraView.as_view(), name='cameras_list'),
    # post
    path('object/<int:obj_id>/camera/create', views.CameraView.as_view(), name='cameras_list'),
    # camera_detail [get, put, delete]
    path('object/<int:obj_id>/camera/<int:cam_id>', views.CameraView.as_view(), name='camera_detail'),

    # superlabels
    # get
    path('superlabels/list', views.SuperLabelView.as_view(), name='superclasses_list'),
    # post
    path('superlabel/create', views.SuperLabelView.as_view(), name='superclasses_list'),
    # get, put, delete
    path('superlabel/<int:lbl_id>', views.SuperLabelView.as_view(), name='superclasses_detail'),


    ############ zones
    # list zones [get]
    path('camera/<int:cam_id>/zones', views.ZoneView.as_view(), name='zones_list'),
    # create zone [post]
    path('camera/<int:cam_id>/zone/create', views.ZoneView.as_view(), name='zone_create'),
    # get, put, delete
    path('camera/<int:cam_id>/zone/<int:zone_id>', views.ZoneView.as_view(), name='zones_detail'),

    # labels
    # get
    path('labels/list', views.LabelView.as_view(), name='superclasses_list'),
    # post
    path('labels/create', views.LabelView.as_view(), name='superclasses_list'),
    # get, put, delete
    path('labels/<int:lbl_id>', views.LabelView.as_view(), name='superclasses_detail'),

    # колличество людей в камере
    path('camera/<int:cam_id>/workers/number/curent/', views.WorkerCountView.as_view(), name='last_event'),


    path('object-category/register', views.RegisterObjectCategoryView.as_view(), name='register_object_category'),

    path('camera/<int:cam_id>/report/<int:year>/<int:month>/<int:day>', views.ReportView.as_view(), name='register_object_category'),
    path('camera/<int:cam_id>/report/<int:year>/<int:month>/<int:day>/<int:lbl_id>', views.ReportView.as_view(), name='register_object_category'),
    #path('event/')

    #path('camera/list', views.CameraCameraSerializers.as_view(), name='camera_list'),
    #path('product/record/start', views.StartProductUnpackView.as_view(), name='start_record'),
    #path('product/record/stop', views.StopProductUnpackView.as_view(), name='stop_record'),
]
