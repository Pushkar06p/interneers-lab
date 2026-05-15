import jwt
import datetime

SECRET_KEY = "your_secret_key"

def generate_token(user):

    payload = {

        "id": str(user.id),

        "username": user.username,

        "role": user.role,

        "exp":
        datetime.datetime.now()
        + datetime.timedelta(hours=24)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token


def decode_token(token):

    return jwt.decode(
        token,
        SECRET_KEY,
        algorithms=["HS256"]
    )