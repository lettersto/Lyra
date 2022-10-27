package hermes.businessservice.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.CategoryConverter;
import hermes.businessservice.entity.PheedImg;
import hermes.businessservice.entity.PheedTag;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class ResponsePheed {

    private Long userId;

    private String title;

    private String content;

    private Timestamp startTime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    List<PheedImg> pheedImg = new ArrayList<>();

    private Category category;

    List<PheedTag> pheedTag = new ArrayList<>();

    private Timestamp time;
}
