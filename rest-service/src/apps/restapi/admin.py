from django.contrib import admin

from . import models

admin.site.register(models.ObjectBuilder)
admin.site.register(models.Camera)
admin.site.register(models.SuperLabel)
admin.site.register(models.Label)

admin.site.register(models.Violation)
admin.site.register(models.ObjectCategory)
admin.site.register(models.CameraFrame)






#admin.site.register(VideoMessage)
#admin.site.register(PhotoMessage)
