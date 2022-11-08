package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Talk;
import hermes.Lyra.domain.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TalkRepository extends JpaRepository<Talk, Long> {
//    @Query(value = "SELECT t FROM Talk t WHERE t.user = :user")
//    List<Talk> findAllByUser(User user, Sort sort);

    long countByIsReadAndUser(boolean b, User user);

    Iterable<Talk> findAllByUser(User user);
}
