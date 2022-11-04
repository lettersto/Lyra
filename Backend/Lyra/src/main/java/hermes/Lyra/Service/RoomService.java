package hermes.Lyra.Service;

import hermes.Lyra.domain.Participant;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Room;

import java.util.Optional;

public interface RoomService {
//    Room getRoomByPheedId(Long pheedId);

    Room createRoom(Long pheedId);

    Participant createParticipant(Long pheedId, Long userId, Boolean isIn);

    Participant updateParticipant(Long pheedId, Long userId, Boolean isIn);

//    Optional<Pheed> getPheedById(Long pheedId);
}
