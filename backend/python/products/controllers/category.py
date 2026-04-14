import json
from dataclasses import dataclass
from typing import Optional
from rest_framework.decorators import api_view
from django.http import JsonResponse
from ..services.product_service import ProductService
from ..services.category_service import CategoryService
from ..serializers import *
from ..exceptions import *
from ..validators import *
from ..responses import *
from ..pagination import *

product_service = ProductService()
category_service = CategoryService()

@dataclass
class GetCategoryRequest:
    name : Optional[str] = None

@api_view(["GET", "POST"])
def categories(request):

    if request.method == "GET":
        get_category_request = GetCategoryRequest(
            name = request.GET.get('name', None)
        )
        page = request.GET.get("page", 1)
        sort_by=request.GET.get("sort_by","-updated_at")
        sorted_categories = category_service.get_all_categories(get_category_request, sort_by)
        categories=paginate_categories(request, sorted_categories, page)
        return success_response(
            "categories", categories, 200
        )
    
    elif request.method == "POST":
        try:
            data = json.loads(request.body) 
            data=validate_category(data)
            category = category_service.create_category(data)
            serialized_category = serialize_catgeory(category)
            return success_response("category created",serialized_category, 201)
        except InvalidData as e:  
            return error_response(str(e), 400)

    else:
        return invalid_method_response()
@api_view(["GET","PUT","PATCH","DELETE"])    
def category_detail(request, category_id):
   
    if request.method == "GET":
        try:
            category = category_service.get_category(category_id)
            serialized_category = serialize_catgeory(category)
            return success_response("category",serialized_category, 200)
        except CategoryError as e:
            return error_response(e.message, e.status_code)
        
    elif request.method == "PUT":    
        try:    
            data = json.loads(request.body)
            data=validate_category(data)
            category = category_service.update_category(category_id, data)
            serialized_category = serialize_catgeory(category)
            return success_response("category updated",serialized_category, 200)
        except CategoryError as e:
            return error_response(e.message, e.status_code)
        except InvalidData as e:
            return error_response(str(e), 400)
        
    elif request.method == "PATCH":
        try:
            data = json.loads(request.body)
            data=validate_category(data,[])
            category = category_service.update_category(category_id, data, fields_required=False)
            serialized_category = serialize_catgeory(category)
            return success_response("category updated",serialized_category, 200)
        except CategoryError as e:
            return error_response(e.message, e.status_code)
        except InvalidData as e:
            return error_response(str(e), 400)
        
    elif request.method == "DELETE":
        try:
            category=category_service.delete_category(category_id)
            return success_response("category deleted",serialize_catgeory(category), 200)
        except CategoryError as e:
            return error_response(e.message, e.status_code)      
    else:
        return invalid_method_response()


@api_view(["GET"])
def list_products_by_category_id(request, category_id):
    if request.method == "GET":
        try:
            sort_by=request.GET.get("sort_by","-updated_at")    
            category_service.get_category(category_id) 
        except CategoryError as e:
            return error_response(e.message, e.status_code)
        
        products = product_service.list_products_by_category_id(category_id, sort_by)
        serialized_products = [serialize_product(product) for product in products]
        return success_response("products",serialized_products, 200)
    else:
        return invalid_method_response()