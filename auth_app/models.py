from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class User(AbstractBaseUser):
    username = models.TextField(max_length=20, unique=True)
    pasword = models.CharField(max_length=20, null=False)
    email = models.EmailField(null=True, unique=True)

    USERNAME_FIELD = "user_id"
    REQUIRED_FIELDS = ['username', 'password']


class Profile(models.Model):
    profile_name = models.TextField(max_length=20, unique=True)
    profile_pic = models.ImageField(null=True)
    profile_description = models.TextField(max_length=2000, null=True)


