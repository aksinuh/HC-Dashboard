from django.urls import path
from .views import (
    PatientsInfoSerilizerAPiView,
    PatientDetailView,
    DiagnoSerilizerAPiView,
    LabResultSerializerAPiView,
    HealthRecordSerializerAPiView
)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('patients/', PatientsInfoSerilizerAPiView.as_view(), name='patients-list'),
    path('patients/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),
    path('diagnos/<int:patient_id>/', DiagnoSerilizerAPiView.as_view(), name='patient-diagnos'),
    path('lab-results/<int:patient_id>/', LabResultSerializerAPiView.as_view(), name='patient-lab-results'),
    path('health-records/<int:patient_id>/', HealthRecordSerializerAPiView.as_view(), name='patient-health-records'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)