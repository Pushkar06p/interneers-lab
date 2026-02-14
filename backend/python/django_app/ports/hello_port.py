from abc import ABC,abstractmethod

class HelloPort(ABC):
    @abstractmethod
    def hello(self, name:str)->str:
        pass