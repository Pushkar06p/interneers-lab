from django.urls import path
from .views import delete_product, list_all_products, create_product, list_product_by_id, update_product

urlpatterns = [
    path('', list_all_products),
    path('create/', create_product),
    path('<int:product_id>/', list_product_by_id),
    path('<int:product_id>/update/', update_product),
    path('<int:product_id>/delete/', delete_product)
]
