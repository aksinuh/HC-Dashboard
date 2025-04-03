from rest_framework import serializers
from .models import PatientsInfo, Diagnos, LabResults, HealthRecord


class PatientsInfoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = PatientsInfo
        fields = "__all__"
        
        
class DiagnosSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Diagnos
        fields = "__all__"
        

class LabResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabResults
        fields = ["id", "result"]
        read_only_fields = ["id", "user"]
        

class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = "__all__"