package hermes.businessservice.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestSupport {

//    @NotNull(message = "supporterId cannot be null")
//    private Long supporterId;

    @NotNull(message = "buskerId cannot be null")
    private Long buskerId;

    @NotNull(message = "coin cannot be null")
    private Long coin;

    private String content;

}
