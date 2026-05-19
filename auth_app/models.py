from django.db import models

# Create your models here.

class MyUser(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=30, unique=True)
    birthdate = models.DateField(verbose_name='birthdate')
    email = models.CharField(max_length=50)
