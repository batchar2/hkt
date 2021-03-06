# Generated by Django 2.2.2 on 2019-06-29 14:01

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Camera',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('rtsp_url', models.CharField(max_length=512, verbose_name='RTSP-URL')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активная камера')),
                ('position_coords', models.CharField(blank=True, default='', max_length=512, verbose_name='Позиция на карте')),
                ('json_graph_model', models.CharField(blank=True, default='', max_length=10240, verbose_name='Граф')),
                ('screenshot', models.ImageField(blank=True, default=None, upload_to='restapi/', verbose_name='Скриншот')),
                ('fps', models.IntegerField(blank=True, default=0, verbose_name='FPS')),
                ('threshold', models.FloatField(blank=True, default=0.5, verbose_name='threshold')),
            ],
        ),
        migrations.CreateModel(
            name='CameraFrame',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=datetime.datetime(2019, 6, 29, 14, 1, 23, 884943))),
                ('camera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_frames', to='restapi.Camera')),
            ],
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('label', models.CharField(max_length=255, verbose_name='Label')),
            ],
        ),
        migrations.CreateModel(
            name='ObjectBuilder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('picture', models.ImageField(blank=True, default=None, upload_to='restapi/', verbose_name='Изображение')),
            ],
        ),
        migrations.CreateModel(
            name='ObjectCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bbox', models.CharField(max_length=255)),
                ('camera_frame', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='camera_frames', to='restapi.CameraFrame')),
            ],
        ),
        migrations.CreateModel(
            name='SuperLabel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='Название')),
                ('label', models.CharField(blank=True, max_length=255, verbose_name='Label')),
            ],
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='Название')),
                ('color_hex', models.CharField(default='#ff000088', max_length=255, verbose_name='Цвет')),
                ('x', models.IntegerField()),
                ('y', models.IntegerField()),
                ('width', models.IntegerField()),
                ('height', models.IntegerField()),
                ('camera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='view_zones', to='restapi.Camera')),
            ],
        ),
        migrations.CreateModel(
            name='Violation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('probability', models.FloatField(default=0, verbose_name='Вероятность')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='violations', to='restapi.Label')),
                ('object_category', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='violations', to='restapi.ObjectCategory')),
            ],
        ),
        migrations.AddField(
            model_name='objectcategory',
            name='super_label',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='events', to='restapi.SuperLabel'),
        ),
        migrations.AddField(
            model_name='objectcategory',
            name='zone',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='object_categories', to='restapi.Zone'),
        ),
        migrations.AddField(
            model_name='camera',
            name='object_builder',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='cameras', to='restapi.ObjectBuilder'),
        ),
    ]
