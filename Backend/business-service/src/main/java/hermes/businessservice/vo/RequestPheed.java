package hermes.businessservice.vo;

import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.PheedTag;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
public class RequestPheed {

    private String title;

    private String content;

    private Timestamp startTime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private Category category;

    private List<String> pheedTag;


}
