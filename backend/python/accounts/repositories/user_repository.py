from accounts.models.user_model import User

class UserRepository:

    @staticmethod
    def create_user(data):

        user = User(

            username=data["username"],

            email=data["email"],

            role=data["role"],

            created_by=data.get(
                "created_by"
            )
        )

        user.set_password(
            data["password"]
        )

        user.save()

        return user

    @staticmethod
    def get_by_username(username):

        return User.objects(
            username=username
        ).first()

    @staticmethod
    def get_by_id(user_id):

        return User.objects(
            id=user_id
        ).first()