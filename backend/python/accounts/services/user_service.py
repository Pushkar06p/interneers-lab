from accounts.repositories.user_repository import (
    UserRepository
)

class UserService:

    @staticmethod
    def create_user(
        current_user,
        user_data
    ):

        requested_role = (
            user_data["role"]
        )

        # ADMIN
        if current_user.role == "admin":

            if requested_role not in [
                "manager",
                "employee"
            ]:

                raise Exception(
                    "Invalid role"
                )

        # MANAGER
        elif current_user.role == "manager":

            if requested_role != "employee":

                raise Exception(
                    "Managers can only create employees"
                )

        else:

            raise Exception(
                "Permission denied"
            )

        existing_user = (
            UserRepository
            .get_by_username(
                user_data["username"]
            )
        )

        if existing_user:

            raise Exception(
                "Username already exists"
            )

        user_data["created_by"] = (
            current_user.username
        )

        UserRepository.create_user(
            user_data
        )

        return {
            "message":
            "User created successfully"
        }