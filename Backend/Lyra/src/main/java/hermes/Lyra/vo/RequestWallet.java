package hermes.Lyra.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class RequestWallet {

    @NotNull(message = "Address cannot be null")
    @Size(min = 42, message = "Address not be less than 42 characters")
    private String address;

}
