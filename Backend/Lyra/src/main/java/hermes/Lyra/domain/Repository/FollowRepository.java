package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Follow;
import hermes.Lyra.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerIdAndFollowingId(User follower, User following);

    Optional<List<Follow>> findAllByFollowerId(User follower);

    Optional<List<Follow>> findAllByFollowingId(User following);
}
