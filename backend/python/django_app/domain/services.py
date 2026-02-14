from django_app.ports.hello_port import HelloPort

class HelloService(HelloPort):
    
    def hello(self, name:str)->str:
        return f"Hello {name}"