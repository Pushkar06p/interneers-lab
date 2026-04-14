import json
from dataclasses import dataclass
from typing import Optional
from rest_framework.decorators import api_view
from ..services.product_service import ProductService
from ..services.category_service import CategoryService
from ..serializers import *
from ..exceptions import *
from ..validators import *
from ..responses import *
from ..pagination import paginate_products

product_service = ProductService()
category_service = CategoryService()

@dataclass
class GetProductRequest:
    name: Optional[str] = None
    min_price: Optional[str] = None
    max_price: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None

@api_view(["GET", "POST"])
def products(request):

    if request.method == "GET":
        sort_by=request.GET.get("sort_by","-updated_at")
        filters = GetProductRequest(                
                name = request.GET.get('name', None),
                min_price = request.GET.get('min_price', None),
                max_price = request.GET.get('max_price', None),
                brand = request.GET.get('brand', None).split(',') if request.GET.get('brand', None) else None,
                category = request.GET.get('category', None).split(',') if request.GET.get('category', None) else None
            )
        page = request.GET.get("page", 1)   
        sorted_products = product_service.list_products(sort_by, filters)
        products=paginate_products(request, sorted_products, page)
        
        return success_response("products", products, 200)
    
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            data=validate_product(data)
            product = product_service.create_product(data)
            serialized_product = serialize_product(product)
            return success_response("product created",serialized_product, 201)
        except InvalidData as e:
            return error_response(str(e), 400)
    else:
        return invalid_method_response()
    
@api_view(["GET","PUT","PATCH","DELETE"])
def product_detail(request, product_id):
   
    if request.method == "GET":
        try:
            product = product_service.get_product(product_id)
            serialized_product = serialize_product(product)
            return success_response("product",serialized_product, 200)
        except ProductError as e:
           return error_response(e.message, e.status_code)
        

    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            data=validate_product(data)
            product = product_service.update_product(product_id, data)
            serialized_product = serialize_product(product)
            return success_response("product updated",serialized_product, 200)  
        except (ProductError,CategoryError) as e:
            return error_response(e.message,e.status_code)
        except InvalidData as e:
            return error_response(str(e), 400)
        
    elif request.method == "PATCH":
        try:
            data = json.loads(request.body)
            data=validate_product(data, [])
            product = product_service.update_product(product_id, data)
            serialized_product = serialize_product(product)
            return success_response("product updated",serialized_product, 200)
        except ProductError as e:
            return error_response(e.message, e.status_code)
        except InvalidData as e:
           return error_response(str(e), 400)

    elif request.method == "DELETE":

        try:
            product = product_service.delete_product(product_id)
            return success_response("product deleted",serialize_product(product), 200)
        except ProductError as e:
            return error_response(e.message, e.status_code)
        
    else:
        return invalid_method_response()
    