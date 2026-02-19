from django.db import models
from decimal import Decimal
# Create your models here.


class Product:
    id: int
    name: str
    description: str
    category: str
    price: Decimal
    brand: str
    quantity: int
