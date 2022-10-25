package hermes.businessservice.repository;

import hermes.businessservice.entity.Wallet;
import org.springframework.data.repository.CrudRepository;

public interface WalletRepository extends CrudRepository<Wallet, Long> {

    Iterable<Wallet> findByUserId(Long userId);


//    int delete(Long walletId);
}
