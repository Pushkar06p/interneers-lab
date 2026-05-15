import json

from dataclasses import dataclass

from typing import Optional

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from accounts.permissions.role_permissions import (
    IsEmployee,
    IsManager
)

from ..services.product_service import (
    ProductService
)

from ..services.category_service import (
    CategoryService
)

from ..serializers import *

from ..exceptions import *

from ..validators import *

from ..responses import *

from ..pagination import (
    paginate_products
)

import pandas as pd

product_service = ProductService()

category_service = CategoryService()


@dataclass
class GetProductRequest:

    name: Optional[str] = None

    min_price: Optional[int] = None

    max_price: Optional[int] = None

    min_quantity: Optional[int] = None

    max_quantity: Optional[int] = None

    brand: Optional[str] = None

    category: Optional[str] = None


# =========================================================
# PRODUCTS
# =========================================================

@api_view(["GET", "POST"])

@permission_classes([IsEmployee])

def products(request):

    """
    GET:
        admin
        manager
        employee

    POST:
        admin
        manager
    """

    # =====================================================
    # GET PRODUCTS
    # =====================================================

    if request.method == "GET":

        try:

            sort_by = request.GET.get(
                "sort_by",
                "-updated_at"
            )

            filters = GetProductRequest(

                name=request.GET.get(
                    "name",
                    None
                ),

                min_price=request.GET.get(
                    "min_price",
                    None
                ),

                max_price=request.GET.get(
                    "max_price",
                    None
                ),

                min_quantity=request.GET.get(
                    "min_quantity",
                    None
                ),

                max_quantity=request.GET.get(
                    "max_quantity",
                    None
                ),

                brand=request.GET.get(
                    "brand",
                    None
                ).split(",")

                if request.GET.get(
                    "brand",
                    None
                )

                else None,

                category=request.GET.get(
                    "category",
                    None
                ).split(",")

                if request.GET.get(
                    "category",
                    None
                )

                else None,
            )

            all_products = request.GET.get(
                "all",
                False
            )

            # =============================================
            # RETURN ALL PRODUCTS
            # =============================================

            if all_products:

                products = (
                    product_service
                    .list_products(
                        sort_by,
                        filters
                    )
                )

                products = [

                    serialize_product(
                        product
                    )

                    for product in products
                ]

                return success_response(
                    "products",
                    products,
                    200
                )

            # =============================================
            # PAGINATED PRODUCTS
            # =============================================

            page = request.GET.get(
                "page",
                1
            )

            sorted_products = (
                product_service
                .list_products(
                    sort_by,
                    filters
                )
            )

            products = paginate_products(
                request,
                sorted_products,
                page
            )

            return success_response(
                "products",
                products,
                200
            )

        except Exception as e:

            return error_response(
                str(e),
                500
            )

    # =====================================================
    # CREATE PRODUCT
    # =====================================================

    elif request.method == "POST":

        # ONLY ADMIN + MANAGER

        if request.user.role not in [
            "admin",
            "manager"
        ]:

            return error_response(
                "Only admin and manager can create products",
                403
            )

        try:

            data = json.loads(
                request.body
            )

            data = validate_product(
                data
            )

            product = (
                product_service
                .create_product(data)
            )

            serialized_product = (
                serialize_product(
                    product
                )
            )

            return success_response(
                "product created",
                serialized_product,
                201
            )

        except InvalidData as e:

            return error_response(
                str(e),
                400
            )

        except CategoryError as e:

            return error_response(
                e.message,
                e.status_code
            )

        except Exception as e:

            return error_response(
                str(e),
                500
            )

    # =====================================================
    # INVALID METHOD
    # =====================================================

    return invalid_method_response()


# =========================================================
# PRODUCT DETAIL
# =========================================================

@api_view([
    "GET",
    "PUT",
    "PATCH",
    "DELETE"
])

@permission_classes([IsEmployee])

def product_detail(
    request,
    product_id
):

    """
    GET:
        admin
        manager
        employee

    PUT/PATCH:
        admin
        manager

    DELETE:
        admin only
    """

    # =====================================================
    # GET PRODUCT
    # =====================================================
    if request.method == "GET":

        try:

            product = (
                product_service
                .get_product(product_id)
            )

            serialized_product = (
                serialize_product(
                    product
                )
            )

            return success_response(
                "product",
                serialized_product,
                200
            )

        except ProductError as e:

            return error_response(
                e.message,
                e.status_code
            )

    # =====================================================
    # UPDATE PRODUCT
    # =====================================================

    elif request.method in [
        "PUT",
        "PATCH"
    ]:

        # ONLY ADMIN + MANAGER

        if request.user.role not in [
            "admin",
            "manager"
        ]:

            return error_response(
                "Only admin and manager can update products",
                403
            )

        try:

            data = json.loads(
                request.body
            )

            # =============================================
            # PUT → FULL VALIDATION
            # =============================================

            if request.method == "PUT":

                data = validate_product(
                    data
                )

            # =============================================
            # PATCH → PARTIAL VALIDATION
            # =============================================

            else:

                data = validate_product(
                    data,
                    []
                )

            product = (
                product_service
                .update_product(
                    product_id,
                    data
                )
            )

            serialized_product = (
                serialize_product(
                    product
                )
            )

            return success_response(
                "product updated",
                serialized_product,
                200
            )

        except ProductError as e:

            return error_response(
                e.message,
                e.status_code
            )

        except InvalidData as e:

            return error_response(
                str(e),
                400
            )

        except Exception as e:

            return error_response(
                str(e),
                500
            )

    # =====================================================
    # DELETE PRODUCT
    # =====================================================

    elif request.method == "DELETE":

        # ONLY ADMIN

        if request.user.role != "admin":

            return error_response(
                "Only admin can delete products",
                403
            )

        try:

            product = (
                product_service
                .delete_product(
                    product_id
                )
            )

            return success_response(

                "product deleted",

                serialize_product(
                    product
                ),

                200
            )

        except ProductError as e:

            return error_response(
                e.message,
                e.status_code
            )

        except Exception as e:

            return error_response(
                str(e),
                500
            )

    # =====================================================
    # INVALID METHOD
    # =====================================================

    return invalid_method_response()


@api_view(["POST"])

@permission_classes([IsManager])

def import_products_csv(request):

    # ONLY ADMIN + MANAGER
    # print(request)
    if request.user.role not in [
        "admin",
        "manager"
    ]:

        return error_response(
            "Only admin and manager can import products",
            403
        )

    try:

        # =====================================
        # FILE
        # =====================================

        csv_file = request.FILES.get(
            "file"
        )

        if not csv_file:

            return error_response(
                "CSV file is required",
                400
            )

        # =====================================
        # READ CSV
        # =====================================

        dataframe = pd.read_csv(csv_file)

        dataframe = dataframe.fillna("")

        created_products = []

        for _, row in dataframe.iterrows():

            category_name = row.get("category")

            category = category_service.get_category_by_name(
                category_name
            )
            
            if not category:
                raise Exception(
                    f"Category '{category_name}' not found"
                )

            product_data = {
                "name": row.get("name"),
                "brand": row.get("brand"),
                "price": row.get("price"),
                "quantity": row.get("quantity"),
                "category": str(category.id),
                "description": row.get("description"),
            }


            product=product_service.create_product(product_data)

            created_products.append(product.name)

        return success_response(
            "Products imported successfully",
            {
                "count": len(
                    created_products
                ),

                "products":
                    created_products,
            },
            201
        )

    except Exception as e:

        return error_response(
            str(e),
            500
        )