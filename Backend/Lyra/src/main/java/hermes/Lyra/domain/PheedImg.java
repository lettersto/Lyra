package hermes.Lyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class PheedImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pheed_img_id")
    private Long id;

    private String path;

    private String mime;

    private String name;

    @ManyToOne
    @JoinColumn(name = "pheed_id")
    @JsonIgnore
    private Pheed pheed;

}
