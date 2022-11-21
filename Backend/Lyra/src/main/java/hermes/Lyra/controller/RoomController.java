package hermes.Lyra.controller;


import hermes.Lyra.Service.PheedService;
import hermes.Lyra.Service.RoomService;
import hermes.Lyra.domain.Participant;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Room;
import hermes.Lyra.vo.ResponseRoom;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/room")
@Slf4j
public class RoomController {

    RoomService roomService;

    PheedService pheedService;

    public RoomController(RoomService roomService, PheedService pheedService) {
        this.roomService = roomService;
        this.pheedService = pheedService;
    }
//피드 번호로 참가자 조회
//    /room/paritipant?pheed_id=1
    @GetMapping("/participant")
    public ResponseEntity<ResponseRoom> getRoom(@RequestParam("pheed_id") Long pheedId) throws Exception {

        log.info("Before get participant data");

        Optional<Pheed> pheed = pheedService.getPheedById(pheedId);


        ModelMapper mapper = new ModelMapper();

        ResponseRoom responseRoom = mapper.map(pheed.get(), ResponseRoom.class);

        log.info("After got participant data");

        return ResponseEntity.status(HttpStatus.OK).body(responseRoom);

    }


    //채팅 방 생성
    //    /room?pheed_id=1
    @PostMapping("")
    public ResponseEntity<String> createRoom(@RequestParam("pheed_id") Long pheedId) {

        log.info("Before create room data");

        Room createRoom = roomService.createRoom(pheedId);

        log.info("After create room data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    //참가자 입장
//    /room?pheed_id=1&user_id=1
    @PostMapping("/participant")
    public ResponseEntity<String> createParticipant(@RequestParam("pheed_id") Long pheedId, @RequestParam("user_id") Long userId, @RequestParam("is_in") Boolean isIn) {

        log.info("Before create participant data");

        Participant createParticipant = roomService.createParticipant(pheedId, userId, isIn);

        log.info("After created participant data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    //참가자 상태 변경
    @PatchMapping("/participant")
    public ResponseEntity<String> updateParticipant(@RequestParam("pheed_id") Long pheedId, @RequestParam("user_id") Long userId, @RequestParam("is_in") Boolean isIn) {

        log.info("Before update participant data");

        Participant updateParticipant = roomService.updateParticipant(pheedId, userId, isIn);

        log.info("After updated participant data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

}
