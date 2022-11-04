package hermes.Lyra.Service;

import hermes.Lyra.domain.Participant;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Repository.ParticipantRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.RoomRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Room;
import hermes.Lyra.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class RoomServiceImpl implements RoomService{

    RoomRepository roomRepository;


    PheedRepository pheedRepository;

    ParticipantRepository participantRepository;

    UserRepository2 userRepository2;

    public RoomServiceImpl(RoomRepository roomRepository, PheedRepository pheedRepository, ParticipantRepository participantRepository, UserRepository2 userRepository2) {
        this.roomRepository = roomRepository;
        this.pheedRepository = pheedRepository;
        this.participantRepository = participantRepository;
        this.userRepository2 = userRepository2;
    }

//    @Override
//    public Optional<Pheed> getPheedById(Long pheedId) {
////        Optional<Pheed> pheed = pheedRepository.findById(pheedId);
//
////        return roomRepository.findByPheed(pheed);
//        return pheedRepository.findById(pheedId);
//    }

    @Override
    public Room createRoom(Long pheedId) {
        Optional<Pheed> pheed = pheedRepository.findById(pheedId);
        Room room = new Room();
        room.setPheed(pheed.get());
        return roomRepository.save(room);
    }

    @Override
    public Participant createParticipant(Long pheedId, Long userId, Boolean isIn) {
        Participant participant = new Participant();
        Optional<Pheed> pheed = pheedRepository.findById(pheedId);
        Optional<User> user = userRepository2.findById(userId);
        Room room = roomRepository.findByPheed(pheed);
        participant.setPheed(pheed.get());
        participant.setIs_in(isIn);
        participant.setUser(user.get());
        return participantRepository.save(participant);
    }

    @Override
    public Participant updateParticipant(Long pheedId, Long userId, Boolean isIn) {
        Optional<Pheed> pheed = pheedRepository.findById(pheedId);
        Optional<User> user = userRepository2.findById(userId);
        Room room = roomRepository.findByPheed(pheed);
        Participant participant = participantRepository.findByPheedAndUser(pheed, user);
        participant.setId(participant.getId());
        participant.setPheed(pheed.get());
        participant.setUser(user.get());
        participant.setIs_in(isIn);
        return participantRepository.save(participant);
    }
}
