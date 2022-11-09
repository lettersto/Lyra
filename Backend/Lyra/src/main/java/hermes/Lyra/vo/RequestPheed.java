package hermes.Lyra.vo;


import hermes.Lyra.domain.Category;
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

    private String location;

    private Category category;

    private List<String> pheedTag;


}
