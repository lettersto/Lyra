package hermes.businessservice.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @Column
    private String name;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<PheedTag> pheedTags = new ArrayList<>();;

}
