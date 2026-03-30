from bson import ObjectId

from .models import Product
from product_category.models import ProductCategory

class ProductRepository:

    @staticmethod
    def create(data):
        product = Product(**data)
        product.save()
        return product
    
    @staticmethod
    def get_all():
        return Product.objects()
    
    @staticmethod
    def update(product_id, data):
        product = Product.objects(id=product_id).first()
        if product:
            for key, value in data.items():
                setattr(product, key, value)
            if "category" in data and data["category"]:
                category = ProductCategory.objects.get(
                    id=ObjectId(data["category"])
                )
                product.category = category    
            product.save()
        return product

    @staticmethod
    def get_all_by_category_id(category_id):
        return Product.objects(category=category_id)
    
    @staticmethod
    def remove_category_from_product(product_id):
        product = Product.objects(id=product_id).first()
        if product:
            product.category = None
            product.save()
        return product    
    
    @staticmethod
    def add_category_to_product(product_id, category_id):
        product = Product.objects(id=product_id).first()
        category = ProductCategory.objects(id=category_id).first()
        if product:
            product.category = category
            product.save()
        return product

    @staticmethod
    def get_by_id(product_id):
        return Product.objects(id=product_id).first()
    
    @staticmethod
    def delete_by_id(product_id):
        Product.objects(id=product_id).delete()