from .exceptions import InvalidData


required_product_fields = ["name", "price", "brand", "quantity"]
required_catgory_fields = ["name"]  
def validate_product(data, required_fields=required_product_fields):
    for field in required_fields:
        if field not in data:
            raise InvalidData(f"Missing field: {field}")
    
    if data.get("price") and int(data["price"]) < 0:
        raise InvalidData("Price must be non-negative")
        
    if data.get("quantity") and int(data["quantity"]) < 0:
        raise InvalidData("Quantity must be non-negative")
    
    if data.get("name") and (data["name"].strip() == "" or len(data["name"])<3):
        raise InvalidData("Name must be of atleast 3 letters")
    
    if data.get("brand") and (data["brand"].strip() == "" or len(data["brand"])<3):
        raise InvalidData("Brand must be of atleast 3 letters")
    
    return data    

def validate_category(data, required_fields=required_catgory_fields):
    for field in required_fields:
        if field not in data:
            raise InvalidData(f"Missing field: {field}")
    
    if data.get("name") and data["name"].strip() == "":
        raise InvalidData("Name cannot be empty or whitespace")
    
    return data