package hermes.Lyra.controller;

import hermes.Lyra.Service.SupportService;
import hermes.Lyra.domain.Support;
import hermes.Lyra.dto.SupportDto;
import hermes.Lyra.vo.RequestSupport;
import hermes.Lyra.vo.ResponseSupport;
import hermes.Lyra.vo.ResponseSupport2;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> createSupport(@RequestParam("user_id") Long supporterId, @RequestBody RequestSupport support) {

        log.info("Before add support data");
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SupportDto supportDto = mapper.map(support, SupportDto.class);
        supportDto.setSupporterId(supporterId);

        SupportDto createSupport = supportService.createSupport(supportDto);
        ResponseSupport responseSupport = mapper.map(createSupport, ResponseSupport.class);

        log.info("After added support data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    @ApiOperation(value = "내가 후원한 정보 불러오기")
    @GetMapping("give")
    public ResponseEntity<List<ResponseSupport>> getGive(@RequestParam("user_id") Long userId) throws Exception {

        log.info("Before get give support data");

        Iterable<Support> giveSupportList = supportService.getSupportBySupporterId(userId);

        List<ResponseSupport> result = new ArrayList<>();
        giveSupportList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport.class));
        });

        log.info("After got give supported data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @ApiOperation(value = "내가 받은 후원 정보 불러오기")
    @GetMapping("receive")
    public ResponseEntity<List<ResponseSupport2>> getReceive(@RequestParam("user_id") Long userId) throws Exception {

        log.info("Before get receive data");

        Iterable<Support> receivedList = supportService.getSupportByBuskerId(userId);

        List<ResponseSupport2> result = new ArrayList<>();
        receivedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport2.class));
        });

        log.info("After got received data");

        log.info(String.valueOf(result));

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
