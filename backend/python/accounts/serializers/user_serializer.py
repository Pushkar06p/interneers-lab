from rest_framework import serializers

class CreateUserSerializer(
    serializers.Serializer
):

    username = serializers.CharField()

    email = serializers.EmailField()

    password = serializers.CharField()

    role = serializers.ChoiceField(
        choices=[
            "manager",
            "employee"
        ]
    )