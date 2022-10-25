package hermes.businessservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

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
    private Integer coin;

    private String content;

    @Column(nullable = false, updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date time;
}
