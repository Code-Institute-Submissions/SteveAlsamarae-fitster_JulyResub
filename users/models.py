from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

from django_resized import ResizedImageField
import uuid


PHONE_NUMBER_VALIDATOR = RegexValidator(r"^[0-9]{11}$", "Enter a valid phone number.")
NAME_VALIDATOR = RegexValidator(
    r"^[a-zA-Z ]*$", "Your name should not contain any special character."
)


class UserProfile(models.Model):
    """Registered user's profile"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = ResizedImageField(
        size=[300, 300],
        crop=["middle", "center"],
        upload_to="avatars",
        default="default.jpg",
        quality=70,
        keep_meta=False,
        verbose_name="avatar",
        blank=True,
        null=True,
    )
    name = models.CharField(max_length=100, validators=[NAME_VALIDATOR])
    phone = models.CharField(max_length=11, validators=[PHONE_NUMBER_VALIDATOR])
    email = models.EmailField(_("email address"), unique=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

    # delete user's avater when user is deleted
    def delete(self, *args, **kwargs):
        self.avatar.delete()

        return super(UserProfile, self).delete(*args, **kwargs)


class DeliveryAddress(models.Model):
    """
    Customer address where the order will be delivered
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        UserProfile, verbose_name=_("Customer"), on_delete=models.CASCADE
    )
    name = models.CharField(_("Full Name"), max_length=150)
    phone = models.CharField(_("Contact Number"), max_length=50)
    city = models.CharField(_("City/State"), max_length=150)
    postcode = models.CharField(_("Postcode"), max_length=50)
    area = models.CharField(_("Area"), max_length=255)
    address = models.CharField(_("Address"), max_length=255, blank=True)
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"

    def __str__(self):
        return f"{self.name}'s delivery address."
