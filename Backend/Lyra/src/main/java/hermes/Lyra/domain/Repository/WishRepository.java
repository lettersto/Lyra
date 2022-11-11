package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    Optional<Wish> findByUserIdAndPheedId(User user, Pheed pheed);

    Optional<List<Wish>> findAllByUserId(User user);

    Optional<List<Wish>> findAllByPheedId(Pheed pheed);
}
