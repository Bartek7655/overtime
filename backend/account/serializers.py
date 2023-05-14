from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=get_user_model().objects.all())]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        trim_whitespace=False,
        style={"input_type": "password"}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        trim_whitespace=False,
        style={"input_type": "password"}
    )

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'password2')

    def validate(self, attrs):
        """Validate and authenticate the user."""
        if len(attrs.get("password")) < 5:
            raise serializers.ValidationError(
                {"password": "Password is too short (min. 5 chars)."}
            )
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        """Create a new user."""
        user = get_user_model().objects.create_user(
            validated_data["email"],
            validated_data["password"],
        )
        # user.is_active = validated_data['is_active']
        user.save()
        return user
