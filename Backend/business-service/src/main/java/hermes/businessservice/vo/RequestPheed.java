package hermes.businessservice.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.CategoryConverter;
import hermes.businessservice.entity.PheedImg;
import hermes.businessservice.entity.PheedTag;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class RequestPheed {

    private String title;

    private String content;

    private Timestamp startTime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private Category category;

    private List<PheedTag> pheedTag;

    private Long userId;

}
