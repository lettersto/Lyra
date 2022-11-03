package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wallet;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface WalletRepository extends CrudRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);

    @Transactional
    void deleteByUserId(Long userId);

    Wallet getByUserId(Long userId);

    Wallet findByUser(Optional<User> byId);
}
