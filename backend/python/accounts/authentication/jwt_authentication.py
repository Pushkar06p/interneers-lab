from rest_framework.authentication import (
    BaseAuthentication
)

from rest_framework.exceptions import (
    AuthenticationFailed
)

from accounts.utils.jwt_utils import (
    decode_token
)

from accounts.repositories.user_repository import (
    UserRepository
)

class JWTAuthentication(
    BaseAuthentication
):

    def authenticate(
        self,
        request
    ):


        auth_header = request.headers.get(
            "Authorization"
        )

        if not auth_header:

            return None

        try:

            token = auth_header.split(
                " "
            )[1]


            payload = decode_token(
                token
            )


            user = (
                UserRepository
                .get_by_id(
                    payload["id"]
                )
            )


            if not user:

                raise AuthenticationFailed(
                    "User not found"
                )


            return (user, None)

        except Exception as e:


            raise AuthenticationFailed(
                "Invalid token"
            )