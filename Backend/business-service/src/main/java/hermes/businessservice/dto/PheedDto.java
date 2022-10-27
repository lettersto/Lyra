package hermes.businessservice.dto;

import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.PheedImg;
import hermes.businessservice.entity.PheedTag;
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

    private List<PheedImg> pheedImg;

    private Category category;

//    private List<String> pheedTag;

    private Timestamp time;

    private Long userId;
}
