package hermes.Lyra.controller;

import hermes.Lyra.Service.SupportService;
import hermes.Lyra.domain.Support;
import hermes.Lyra.dto.Message;
import hermes.Lyra.dto.StatusEnum;
import hermes.Lyra.dto.SupportDto;
import hermes.Lyra.vo.*;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/support")
@Slf4j
public class SupportController {

    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }

    SupportService supportService;

    @ApiOperation(value = "후원 데이터 생성")
    @PostMapping("")
    public ResponseEntity<String> createSupport(@RequestParam("pheed_id") Long pheedId, @RequestBody RequestSupport support) {

        log.info("Before add support data");
        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SupportDto supportDto = mapper.map(support, SupportDto.class);
//        supportDto.setSupporterId(supporterId);

        SupportDto createSupport = supportService.createSupport(supportDto, pheedId);
        ResponseSupport responseSupport = mapper.map(createSupport, ResponseSupport.class);

        log.info("After added support data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


//    @ApiOperation(value = "내가 후원한 정보 불러오기")
//    @GetMapping("give")
//    public ResponseEntity<List<ResponseSupport>> getGive(@RequestParam("user_id") Long userId) throws Exception {
//
//        log.info("Before get give support data");
//
//        Iterable<Support> giveSupportList = supportService.getSupportBySupporterId(userId);
//
//        List<ResponseSupport> result = new ArrayList<>();
//        giveSupportList.forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponseSupport.class));
//        });
//
//        log.info("After got give supported data");
//
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }
//
//
//    @ApiOperation(value = "내가 받은 후원 정보 불러오기")
//    @GetMapping("receive")
//    public ResponseEntity<List<ResponseSupport2>> getReceive(@RequestParam("user_id") Long userId) throws Exception {
//
//        log.info("Before get receive data");
//
//        Iterable<Support> receivedList = supportService.getSupportByBuskerId(userId);
//
//        List<ResponseSupport2> result = new ArrayList<>();
//        receivedList.forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponseSupport2.class));
//        });
//
//        log.info("After got received data");
//
//        log.info(String.valueOf(result));
//
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }

    @ApiOperation(value = "내가 후원한 정보 불러오기, 페이징0부터&최신순")
    @GetMapping("give")
    public ResponseEntity<List<ResponseSupport>> getGive(@RequestParam("user_id") Long userId, @RequestParam("start_time") Timestamp startTime, @RequestParam("end_time") Timestamp endTime, @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get give support data");

        List<Support> giveSupportList = supportService.getSupportBySupporterId(userId, startTime, endTime, pageable);

        List<ResponseSupport> result = new ArrayList<>();
        giveSupportList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport.class));
        });

        log.info("After got give supported data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @ApiOperation(value = "내가 받은 후원 정보 불러오기, 페이징0부터&최신순")
    @GetMapping("receive")
    public ResponseEntity<List<ResponseSupport2>> getReceive(@RequestParam("user_id") Long userId, @RequestParam("start_time") Timestamp startTime, @RequestParam("end_time") Timestamp endTime, @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get receive data");

        List<Support> receivedList = supportService.getSupportByBuskerId(userId, startTime, endTime, pageable);

        List<ResponseSupport2> result = new ArrayList<>();
        receivedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport2.class));
        });

        log.info("After got received data");

        log.info(String.valueOf(result));

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "채팅 중에 내가 받은 후원 정보 불러오기")
    @GetMapping("chat")
    public ResponseEntity<?> getSupportsbyChat(@RequestParam("pheed_id") Long pheedId) throws Exception {

        log.info("Before get receive data by chat");

        Iterable<Support> receivedList = supportService.getSupportsByChat(pheedId);

        List<ResponseSupport3> result = new ArrayList<>();
        receivedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport3.class));
        });

        int totalCoin = supportService.getTotalCoin(pheedId);

        Message message = new Message();
        message.setStatus(StatusEnum.OK);
        message.setMessage(String.valueOf(totalCoin));
        message.setData(result);

        log.info("After got received data by chat");

//        log.info(String.valueOf(result));

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }
}
