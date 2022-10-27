package hermes.businessservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import hermes.businessservice.config.CategoryConverter;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Pheed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pheed_id")
    private Long id;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false, length = 30)
    private String content;

    @Column(nullable = false)
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp startTime;

    @Column(nullable = false)
    private BigDecimal latitude;

    @Column(nullable = false)
    private BigDecimal longitude;

    @OneToMany(mappedBy = "id",cascade = CascadeType.ALL)
    List<PheedImg> pheedImg = new ArrayList<>();

//    @Enumerated(EnumType.STRING)
    @Convert(converter = CategoryConverter.class)
    private Category category;

    @OneToMany(mappedBy = "pheed",cascade = CascadeType.ALL)
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    List<PheedTag> pheedTag = new ArrayList<>();

    @Column
    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp time;

    @Column(nullable = false)
    private Long userId;
}
