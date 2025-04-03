from rest_framework.generics import ListAPIView
from .serializers import PatientsInfoSerilizer, DiagnosSerilizer, LabResultSerializer, HealthRecordSerializer
from .models import PatientsInfo, Diagnos, LabResults, HealthRecord


class PatientsInfoSerilizerAPiView(ListAPIView):
    queryset =  PatientsInfo.objects.all()
    serializer_class = PatientsInfoSerilizer
    
    
class PatientDetailView(ListAPIView):
    serializer_class = PatientsInfoSerilizer
    
    def get_queryset(self):
        patient_id = self.kwargs.get('pk')
        return PatientsInfo.objects.filter(id=patient_id)
    
    
class DiagnoSerilizerAPiView(ListAPIView):
    serializer_class = DiagnosSerilizer
    
    def get_queryset(self):
        patient_id = self.kwargs.get("patient_id")
        return Diagnos.objects.filter(patient_id=patient_id)
    
    
class LabResultSerializerAPiView(ListAPIView):
    serializer_class = LabResultSerializer
    
    def get_queryset(self):
        patient_id = self.kwargs.get("patient_id")
        return LabResults.objects.filter(user_id=patient_id)
    
    
class HealthRecordSerializerAPiView(ListAPIView):
    serializer_class = HealthRecordSerializer
    
    def get_queryset(self):
        patient_id = self.kwargs.get("patient_id")
        return HealthRecord.objects.filter(patient_id=patient_id)