from django.urls import path

from accounts.controllers.auth_controller import (
    LoginController
)

from accounts.controllers.user_controller import (
    CreateUserController
)

urlpatterns = [

    path(
        "login/",
        LoginController.as_view()
    ),

    path(
        "create-user/",
        CreateUserController.as_view()
    ),
]