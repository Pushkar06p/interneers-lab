from django_app.application.use_cases import HelloUseCase
from django_app.domain.services import HelloService
from django.http import JsonResponse
def hello_view(request):
    
    name=request.GET.get("name","World")

    services=HelloService()
    use_case=HelloUseCase(services)

    message=use_case.execute(name)

    return JsonResponse({
        "message":message
    })