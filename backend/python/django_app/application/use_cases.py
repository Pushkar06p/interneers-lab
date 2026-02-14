
class HelloUseCase():

    def __init__(self,hello_service):
        self.hello_service=hello_service
    
    def execute(self,name)->str:
        return self.hello_service.hello(name)