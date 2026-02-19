import json
from django.http import JsonResponse
from .storage import PRODUCTS, CURRENT_ID
from django.views.decorators.csrf import csrf_exempt
import warehouse.storage as storage
# Create your views here.


def list_all_products(request):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET allowed"}, status=405)

    return JsonResponse(PRODUCTS, safe=False)


@csrf_exempt
def create_product(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    
    try :
        data = json.loads(request.body)
        
        # Validate data here
        required_fields = ["name", "description", "category", "price", "brand", "quantity"]

        for field in required_fields:
            if field not in data:
                return JsonResponse({"error": f"Missing field: {field}"}, status=400)
            
        if float(data["price"]) < 0:
            return JsonResponse({"error": "Price must be non-negative"}, status=400)
        
        if int(data["quantity"]) < 0:
            return JsonResponse({"error": "Quantity must be non-negative"}, status=400)

        # Create product
        new_product = {
            "id": storage.CURRENT_ID + 1,
            "name": data["name"],
            "description": data["description"],
            "category": data["category"],
            "price": data["price"],
            "brand": data["brand"],
            "quantity": data["quantity"]
        }
        PRODUCTS.append(new_product)
        storage.CURRENT_ID +=1

        return JsonResponse(new_product, status=201)
    

    except json.JSONDecodeError:    
        return JsonResponse({"error": "Invalid JSON"}, status=400)

def list_product_by_id(request, product_id):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET allowed"}, status=405)
    
    for product in PRODUCTS:
        if product["id"] == product_id:
            return JsonResponse(product)
    
    return JsonResponse({"error": "Product not found"}, status=404)


@csrf_exempt
def update_product(request, product_id):
    if request.method != "PUT":
        return JsonResponse({"error": "Only PUT allowed"}, status=405)
    
    for product in PRODUCTS:
        if(product["id"] == product_id):
            try:
                data = json.loads(request.body)
                # Update fields
                for key in ["name", "description", "category", "price", "brand", "quantity"]:
                    if key in data:
                        product[key] = data[key]

                return JsonResponse(product)
            
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON"}, status=400)
        
    return JsonResponse({"error": "Product not found"}, status=404)

            
@csrf_exempt
def delete_product(request, product_id):
    if request.method != "DELETE":
        return JsonResponse({"error": "Only DELETE allowed"}, status=405)
    
    for i, product in enumerate(PRODUCTS):
        if product["id"] == product_id:
            del PRODUCTS[i]
            return JsonResponse({"message": "Product deleted"})
    
    return JsonResponse({"error": "Product not found"}, status=404)