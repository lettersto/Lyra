package hermes.user_service.error.Exception.custom;

import hermes.user_service.error.Exception.InvalidValueException;

public class SomethingNullException extends InvalidValueException {
    public SomethingNullException(String r){
        super(r + "is null");
    }

}
