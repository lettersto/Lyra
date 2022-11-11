package hermes.Lyra.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import hermes.Lyra.config.CategoryConverter;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
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

    @Column(nullable = false)
    private String location;

    @ColumnDefault("0")
    private int state;

    @Column(nullable = false)
    private String regionCode;

    @OneToMany(mappedBy = "pheed",cascade = CascadeType.ALL)
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "pheed", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comment = new ArrayList<>();

    @OneToMany(mappedBy = "pheed", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Participant> participant = new ArrayList<>();

//    @OneToMany(orphanRemoval = true, mappedBy = "pheedId", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Like> likeList = new ArrayList<>();
}
