package hermes.Lyra.domain;


import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name = "follow")
public class Follow {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "follower_id")
    private User followerId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "following_id")
    private User followingId;

}
