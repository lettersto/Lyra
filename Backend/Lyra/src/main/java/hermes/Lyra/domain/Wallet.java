package hermes.Lyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Data
@Entity
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id")
    private Long id;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Long coin;

    @OneToMany(mappedBy = "chargeId", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Charge> charge = new ArrayList<>();
}