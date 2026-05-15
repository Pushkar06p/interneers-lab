from mongoengine import (
    Document,
    StringField,
    EmailField
)

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

class User(Document):

    username = StringField(
        required=True,
        unique=True
    )

    email = EmailField(
        required=True,
        unique=True
    )

    password = StringField(
        required=True
    )

    role = StringField(
        choices=[
            "admin",
            "manager",
            "employee"
        ],
        default="employee"
    )

    created_by = StringField()

    meta = {
        "collection": "users"
    }

    # =========================================
    # PASSWORD METHODS
    # =========================================

    def set_password(
        self,
        raw_password
    ):

        self.password = (
            generate_password_hash(
                raw_password
            )
        )

    def check_password(
        self,
        raw_password
    ):

        return check_password_hash(
            self.password,
            raw_password
        )

    # =========================================
    # DRF AUTH SUPPORT
    # =========================================

    @property
    def is_authenticated(self):

        return True