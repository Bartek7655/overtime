from django.contrib.auth.models import AbstractUser, UnicodeUsernameValidator
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManagerEdited(BaseUserManager):

    def create_user(self, email, password, **kwargs):
        """Create, save and return a new user."""
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_super_user(self, email, password, **kwargs):
        """Create and return superuser."""
        kwargs.setdefault("is_staff", False)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)

        # if kwargs.get("is_staff") is not True:
        #     raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **kwargs)


class User(AbstractUser):

    username_validator = UnicodeUsernameValidator

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        blank=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(
        _("email address"),
        unique=True
    )
    is_active = models.BooleanField(
        default=False
    )

    objects = UserManagerEdited
