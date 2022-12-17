from django.conf.urls import url
from PoliceApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^unit$',views.unitApi),
    url(r'^unit/([0-9]+)$',views.unitApi),
    
    url(r'^employee$',views.employeeApi),
    url(r'^employee/([0-9]+)$',views.employeeApi),

    url(r'^vehicle$',views.vehicleApi),
    url(r'^vehicle/([0-9]+)$',views.vehicleApi),

    url(r'^log$',views.logApi),
    url(r'^log/([0-9]+)$',views.logApi),

    url(r'^employee/savefile',views.SaveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)