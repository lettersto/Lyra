package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Participant;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ParticipantRepository extends CrudRepository<Participant, Long> {
    Participant findByPheedAndUser(Optional<Pheed> pheed, Optional<User> user);
}
