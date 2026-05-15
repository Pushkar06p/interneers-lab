from rest_framework.permissions import (
    BasePermission
)

class IsAdmin(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (

            request.user
            and

            request.user.is_authenticated
            and

            getattr(
                request.user,
                "role",
                None
            ) == "admin"
        )


class IsManager(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (

            request.user
            and

            request.user.is_authenticated
            and

            getattr(
                request.user,
                "role",
                None
            ) in [
                "admin",
                "manager"
            ]
        )


class IsEmployee(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (

            request.user
            and

            request.user.is_authenticated
            and

            getattr(
                request.user,
                "role",
                None
            ) in [
                "admin",
                "manager",
                "employee"
            ]
        )