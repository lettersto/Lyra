package hermes.Lyra.domain.Repository;


import hermes.Lyra.domain.Charge;
import hermes.Lyra.domain.Wallet;
import org.springframework.data.repository.CrudRepository;

public interface ChargeRepository extends CrudRepository<Charge, Long> {
    Iterable<Charge> findByWallet(Wallet wallet);

    void deleteByWallet(Wallet w);
}
