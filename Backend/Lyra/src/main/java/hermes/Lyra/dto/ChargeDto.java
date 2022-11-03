package hermes.Lyra.dto;


import hermes.Lyra.domain.Wallet;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChargeDto {
    private String ca;

    private Timestamp time;

    private Long coin;

    private Wallet wallet;

}
