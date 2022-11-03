package hermes.businessservice.dto;


import hermes.businessservice.entity.Wallet;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChargeDto {
    private String ca;

    private Timestamp time;

    private Long coin;

    private Wallet wallet;

}
