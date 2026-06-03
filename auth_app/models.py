from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.

class StudyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email: raise ValueError('Must set the Email field properly')

        email = self.normalize_email(email)
        user = self.model(email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class StudyUser(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    password = models.TextField(max_length=50, unique=True)
    birthdate = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)

    objects = StudyUserManager()

    USERNAME_FIELD = 'email'