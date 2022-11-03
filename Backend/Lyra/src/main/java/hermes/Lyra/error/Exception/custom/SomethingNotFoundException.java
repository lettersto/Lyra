package hermes.user_service.error.Exception.custom;

import hermes.user_service.error.Exception.EntityNotFoundException;

public class SomethingNotFoundException extends EntityNotFoundException {
    public SomethingNotFoundException(String value){
        super(value+" is not found");
    }
}
