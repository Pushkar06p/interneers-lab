from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.serializers.auth_serializer import (
    LoginSerializer
)

from accounts.services.auth_service import (
    AuthService
)

class LoginController(APIView):

    permission_classes = []
    authentication_classes = []

    def post(
        self,
        request
    ):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = AuthService.login(
            serializer.validated_data
        )

        return Response(data)