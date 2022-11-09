package hermes.businessservice.vo;

import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.PheedImg;
import hermes.businessservice.entity.PheedTag;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
public class ResponsePheed {

    private Long userId;

    private String title;

    private String content;

    private Timestamp startTime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    List<PheedImg> pheedImg = new ArrayList<>();

    private String category;

    List<PheedTag> pheedTag = new ArrayList<>();

    private Timestamp time;
}
