package hermes.Lyra.dto;


import hermes.Lyra.domain.Category;
import hermes.Lyra.domain.PheedImg;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;


@Data
public class PheedDto {

    private String title;

    private String content;

    private Timestamp startTime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String location;

    private List<PheedImg> pheedImg;

    private Category category;

    private Timestamp time;

    private Long userId;
}
