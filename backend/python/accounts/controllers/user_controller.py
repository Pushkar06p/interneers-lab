from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.serializers.user_serializer import (
    CreateUserSerializer
)

from accounts.services.user_service import (
    UserService
)

class CreateUserController(APIView):

    def post(
        self,
        request
    ):
        
        serializer = CreateUserSerializer(
            data=request.data
        )
        print(request.data)
        serializer.is_valid(
            raise_exception=True
        )

        data = UserService.create_user(
            request.user,
            serializer.validated_data
        )

        return Response(data)