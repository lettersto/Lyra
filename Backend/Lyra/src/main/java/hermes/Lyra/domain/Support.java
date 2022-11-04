package hermes.Lyra.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

@Data
@Entity
public class Support {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "support_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "busker_id")
    private User busker;

    @ManyToOne
    @JoinColumn(name = "supporter_id")
    private User supporter;

    @Column(nullable = false)
    private Long coin;

    @Column(nullable = false)
    private String ca;

    @Column
    private String content;

    @Column
    @CreationTimestamp
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp time;
}
