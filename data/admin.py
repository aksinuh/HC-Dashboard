from django.contrib import admin
from .models import PatientsInfo, Diagnos, LabResults, HealthRecord
from django.contrib.auth import get_user_model

User = get_user_model()

@admin.register(User)
class Useradmin(admin.ModelAdmin):
    list_display = ["id", "username", "email"]
    list_display_links = ["username"]

@admin.register(PatientsInfo)
class PatientsInfoadmin(admin.ModelAdmin):
    list_display = ["id", "full_name", "gender", "age"]
    list_display_links = ["full_name"]
    
@admin.register(Diagnos)
class Diagnosadmin(admin.ModelAdmin):
    list_display = ["id", "patient", "name", "status"]
    list_display_links = ["patient"]

@admin.register(LabResults)
class LabResultsadmin(admin.ModelAdmin):
    list_display = ["id", "user", "result"]
    list_display_links = ["user"]
    
@admin.register(HealthRecord)
class HealthRecordadmin(admin.ModelAdmin):
    list_display = ["id", "patient", "month", "year"]
    list_display_links = ["patient"]
    
