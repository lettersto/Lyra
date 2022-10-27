package hermes.businessservice.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "tag_id")
    private int id;

    private String name;

    @OneToMany(mappedBy = "tag",cascade = CascadeType.ALL)
    private List<PheedTag> pheedTags;

}
