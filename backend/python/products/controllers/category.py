import json

from dataclasses import dataclass

from typing import Optional

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from accounts.permissions.role_permissions import (
    IsEmployee
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
    paginate_categories
)

product_service = ProductService()

category_service = CategoryService()


@dataclass
class GetCategoryRequest:

    name: Optional[str] = None


# =========================================================
# CATEGORIES
# =========================================================

@api_view(["GET", "POST"])

@permission_classes([IsEmployee])

def categories(request):

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
    # GET CATEGORIES
    # =====================================================

    if request.method == "GET":

        try:

            filters = GetCategoryRequest(

                name=request.GET.get(
                    "name",
                    None
                )
            )

            sort_by = request.GET.get(
                "sort_by",
                "-updated_at"
            )

            all_categories = request.GET.get(
                "all",
                False
            )

            # =============================================
            # RETURN ALL CATEGORIES
            # =============================================

            if all_categories:

                categories = (
                    category_service
                    .get_all_categories(
                        filters,
                        sort_by
                    )
                )

                categories = [

                    serialize_catgeory(
                        category
                    )

                    for category in categories
                ]

                return success_response(
                    "categories",
                    categories,
                    200
                )

            # =============================================
            # PAGINATED CATEGORIES
            # =============================================

            page = request.GET.get(
                "page",
                1
            )

            sorted_categories = (
                category_service
                .get_all_categories(
                    filters,
                    sort_by
                )
            )

            categories = (
                paginate_categories(
                    request,
                    sorted_categories,
                    page
                )
            )

            return success_response(
                "categories",
                categories,
                200
            )

        except Exception as e:

            return error_response(
                str(e),
                500
            )

    # =====================================================
    # CREATE CATEGORY
    # =====================================================

    elif request.method == "POST":

        # ONLY ADMIN + MANAGER

        if request.user.role not in [
            "admin",
            "manager"
        ]:

            return error_response(
                "Only admin and manager can create categories",
                403
            )

        try:

            data = json.loads(
                request.body
            )

            data = validate_category(
                data
            )

            category = (
                category_service
                .create_category(data)
            )

            serialized_category = (
                serialize_catgeory(
                    category
                )
            )

            return success_response(
                "category created",
                serialized_category,
                201
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
    # INVALID METHOD
    # =====================================================

    return invalid_method_response()


# =========================================================
# CATEGORY DETAIL
# =========================================================

@api_view([
    "GET",
    "PUT",
    "PATCH",
    "DELETE"
])

@permission_classes([IsEmployee])

def category_detail(
    request,
    category_id
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
    # GET CATEGORY
    # =====================================================

    if request.method == "GET":

        try:

            category = (
                category_service
                .get_category(category_id)
            )

            serialized_category = (
                serialize_catgeory(
                    category
                )
            )

            return success_response(
                "category",
                serialized_category,
                200
            )

        except CategoryError as e:

            return error_response(
                e.message,
                e.status_code
            )

    # =====================================================
    # UPDATE CATEGORY
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
                "Only admin and manager can update categories",
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

                data = validate_category(
                    data
                )

            # =============================================
            # PATCH → PARTIAL VALIDATION
            # =============================================

            else:

                data = validate_category(
                    data,
                    []
                )

            category = (
                category_service
                .update_category(
                    category_id,
                    data
                )
            )

            serialized_category = (
                serialize_catgeory(
                    category
                )
            )

            return success_response(
                "category updated",
                serialized_category,
                200
            )

        except CategoryError as e:

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
    # DELETE CATEGORY
    # =====================================================

    elif request.method == "DELETE":

        # ONLY ADMIN

        if request.user.role != "admin":

            return error_response(
                "Only admin can delete categories",
                403
            )

        try:

            category = (
                category_service
                .delete_category(
                    category_id
                )
            )

            return success_response(
                "category deleted",
                serialize_catgeory(
                    category
                ),
                200
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
# PRODUCTS BY CATEGORY
# =========================================================

@api_view(["GET"])

@permission_classes([IsEmployee])

def list_products_by_category_id(
    request,
    category_id
):

    """
    GET:
        admin
        manager
        employee
    """

    if request.method == "GET":

        try:

            sort_by = request.GET.get(
                "sort_by",
                "-updated_at"
            )

            # CHECK CATEGORY EXISTS
            category_service.get_category(
                category_id
            )

            products = (
                product_service
                .list_products_by_category_id(
                    category_id,
                    sort_by
                )
            )

            serialized_products = [

                serialize_product(
                    product
                )

                for product in products
            ]

            return success_response(
                "products",
                serialized_products,
                200
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