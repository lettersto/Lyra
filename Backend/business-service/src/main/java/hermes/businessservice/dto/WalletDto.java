package hermes.businessservice.dto;

import lombok.Data;

@Data
public class WalletDto {
    private Long walletId;

    private String address;

    private Long coin;

    private Long userId;

}