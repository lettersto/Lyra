package hermes.businessservice.dto;

import lombok.Data;

@Data
public class SupportDto {
    private Long supportId;

    private String content;

    private Integer coin;

    private Long supporterId;

    private Long buskerId;
}
