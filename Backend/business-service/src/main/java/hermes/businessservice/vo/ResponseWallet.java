package hermes.businessservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseWallet {
//    private String walletId;
    private String address;
    private Long userId;
    private Long coin;
}
