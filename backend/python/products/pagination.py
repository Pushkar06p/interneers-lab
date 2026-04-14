from rest_framework.pagination import PageNumberPagination
from .serializers import *
import math
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 4
    page_query_param = "page"

def paginate_products(request, products, page):
    paginator = StandardResultsSetPagination()
    paginator.page = page
    paginated_products = paginator.paginate_queryset(products, request)
    serialized_products = [serialize_product(product) for product in paginated_products]
    print(math.ceil((len(products)) / paginator.page_size))
    return {
        "count": math.ceil((len(products)) / paginator.page_size) ,
        "next": paginator.get_next_link(),
        "previous": paginator.get_previous_link(),
        "results": serialized_products
    }

def paginate_categories(request, categories, page):
    paginator = StandardResultsSetPagination()
    paginator.page = page
    paginated_categories = paginator.paginate_queryset(categories, request)
    serialized_categories = [serialize_catgeory(category) for category in paginated_categories]
    return {
        "count": math.ceil((len(categories)) / paginator.page_size) ,
        "next": paginator.get_next_link(),
        "previous": paginator.get_previous_link(),
        "results": serialized_categories
    }
