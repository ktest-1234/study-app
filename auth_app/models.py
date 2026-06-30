from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class StudyUser(AbstractBaseUser):
    username = models.TextField(max_length='20' unique=True)
    user_id = models.CharField(max_length='200', unique=True, null=False)
    pasword = models.CharField(max_length='20', null=False)
    email = models.EmailField(null=True, unique=True)

    USERNAME_FIELD = "user_id"