from bson import ObjectId
from .models import Product, Category


class ProductRepository:

    @staticmethod
    def create(data):
        product = Product(**data)
        product.save()
        return product

    @staticmethod
    def get_all(sort_by, filters):
        allowed_sorts = ['name', '-name', 'price', '-price', 'created_at', '-created_at', 'updated_at', '-updated_at']
        
        if sort_by not in allowed_sorts:
            sort_by = '-updated_at'

        products = Product.objects()

        if filters.name:
            products = products.filter(name__icontains=filters.name)

        if filters.min_price:
            products = products.filter(price__gte=filters.min_price)

        if filters.max_price:
            products = products.filter(price__lte=filters.max_price)

        if filters.min_quantity:
            products = products.filter(quantity__gte=filters.min_quantity)

        if filters.max_quantity:
            products = products.filter(quantity__lt=filters.max_quantity)
    
        if filters.brand:
            products = products.filter(brand__in=filters.brand)

        if filters.category:
            products = products.filter(category__in=filters.category)

        return products.order_by(sort_by)                                

    @staticmethod
    def get_by_id(id):
        return Product.objects(id=id).first()

    @staticmethod
    def update(product):
        product.save()
        return product

    @staticmethod
    def delete(id):
        product = Product.objects(id=id).first()
        if product:
            product.delete()
        return product

    @staticmethod
    def get_all_by_category_id(category_id, sort_by):
        allowed_sorts = ['name', '-name', 'price', '-price', 'created_at', '-created_at', 'updated_at', '-updated_at']
        
        if sort_by not in allowed_sorts:
            sort_by = '-updated_at'
        return Product.objects(category=category_id).order_by(sort_by)


class CategoryRepository:

    @staticmethod
    def create(data):
        category = Category(**data)
        category.save()
        return category

    @staticmethod
    def get_all(get_category_request,sort_by):
        categories = Category.objects()
        allowed_sorts = ['name', '-name', 'created_at', '-created_at', 'updated_at', '-updated_at']
        
        if sort_by not in allowed_sorts:
            sort_by = '-updated_at'

        if get_category_request.name:
            categories = categories.filter(name__icontains=get_category_request.name)

        return categories.order_by(sort_by) 

    @staticmethod
    def get_by_id(category_id,):
        return Category.objects(id=category_id).first()

    @staticmethod
    def update(category):
        category.save()
        return category

    @staticmethod
    def delete(category_id):
        category = Category.objects(id=category_id).first()
        if category:
            category.delete()
        return category