package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoomRepository extends CrudRepository<Room, Long> {
    Room findByPheed(Optional<Pheed> pheed);
}
