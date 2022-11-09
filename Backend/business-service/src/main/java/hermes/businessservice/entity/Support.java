package hermes.businessservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
public class Support {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "support_id")
    private Long id;

    @Column(nullable = false)
    private Long supporterId;

    @Column(nullable = false)
    private Long buskerId;

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
