from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)
    

class PatientsInfo(models.Model):
    GENDER_CHOICES = [
        ('F', 'Female'),
        ('M', 'Male')
    ]
    
    full_name =  models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    contact_number = models.CharField(max_length=15)
    emergency_contact = models.CharField(max_length=15)
    insurance_provider = models.CharField(max_length=100)
    profile_picture = models.FileField(upload_to="profile_img")
    age = models.PositiveIntegerField()
    
    def __str__(self):
        return self.full_name
    
    class Meta:
        verbose_name_plural = "Personal Information"
        
        
class Diagnos(models.Model):
    patient = models.ForeignKey(PatientsInfo, on_delete=models.CASCADE, related_name='patient')
    name = models.CharField(max_length=150)
    description = models.TextField()
    status = models.CharField(max_length=150)
        
    def __str__(self):
        return self.name
        
        
class LabResults(models.Model):
    user = models.ForeignKey(PatientsInfo, on_delete=models.CASCADE, related_name="user")
    result = models.FileField(upload_to='diaqnoz/')
    

class HealthRecord(models.Model):
    LEVEL_CHOICES = [
        ('low', 'Lower than Average'),
        ('normal', 'Normal'),
        ('high', 'Higher than Average'),
    ]
    
    patient = models.ForeignKey(PatientsInfo, on_delete=models.CASCADE, related_name ="healt_patient")
    month = models.CharField(max_length=20)
    year = models.PositiveIntegerField()
    
    # Blood Pressure
    systolic_value = models.PositiveIntegerField()
    systolic_level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    diastolic_value = models.PositiveIntegerField()
    diastolic_level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    
    # Other metrics
    heart_rate_value = models.PositiveIntegerField()
    heart_rate_level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    respiratory_rate_value = models.PositiveIntegerField()
    respiratory_rate_level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    temperature_value = models.PositiveIntegerField()
    temperature_level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.patient.full_name} - {self.month} {self.year}"