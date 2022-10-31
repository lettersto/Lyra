package hermes.businessservice.dto;

import lombok.Data;

@Data
public class SupportDto {
    private Long supportId;

    private String content;

    private Integer coin;

    private String ca;

    private Long supporterId;

    private Long buskerId;
}
