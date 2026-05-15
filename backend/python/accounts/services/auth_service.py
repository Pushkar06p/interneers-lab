from accounts.repositories.user_repository import (
    UserRepository
)

from accounts.utils.jwt_utils import (
    generate_token
)

class AuthService:

    @staticmethod
    def login(data):

        user = (
            UserRepository
            .get_by_username(
                data["username"]
            )
        )

        if not user:
            raise Exception(
                "User not found"
            )

        if not user.check_password(
            data["password"]
        ):
            raise Exception(
                "Invalid password"
            )

        token = generate_token(user)

        return {

            "token": token,

            "role": user.role,

            "username": user.username
        }