package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Talk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TalkRepository extends JpaRepository<Talk, Long> {
    List<Talk> findAllByUserId(Long userId);
}
