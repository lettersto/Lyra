package hermes.businessservice.repository;

import hermes.businessservice.entity.Wallet;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface WalletRepository extends CrudRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);

    @Transactional
    void deleteByUserId(Long userId);

//    void updateByUserId(Long userId, Long coin);
}
