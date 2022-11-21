package hermes.Lyra.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestCharge {

    @NotNull(message = "coin cannot be null")
    private Long coin;

    private String ca;
}
