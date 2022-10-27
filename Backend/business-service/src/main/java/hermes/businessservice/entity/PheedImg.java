package hermes.businessservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class PheedImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pheed_img_id")
    private Long id;

    private String path;

    @ManyToOne
    @JoinColumn(name = "no")
    @JsonIgnore
    private Pheed pheedId;

}
