package hermes.businessservice.repository;

import hermes.businessservice.entity.Charge;
import hermes.businessservice.entity.Wallet;
import org.springframework.data.repository.CrudRepository;

public interface ChargeRepository extends CrudRepository<Charge, Long> {
    Iterable<Charge> findByWallet(Wallet wallet);

    void deleteByWallet(Wallet w);
}
