package hermes.businessservice.controller;

import hermes.businessservice.dto.SupportDto;
import hermes.businessservice.entity.Support;
import hermes.businessservice.service.SupportService;
import hermes.businessservice.vo.RequestSupport;
import hermes.businessservice.vo.ResponseSupport;
<<<<<<< HEAD
import hermes.businessservice.vo.ResponseWallet;
=======
//import io.swagger.annotations.ApiOperation;
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/business-service")
@Slf4j
public class SupportController {

    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }

    SupportService supportService;

<<<<<<< HEAD
=======
//    @ApiOperation(value = "새로운 후원 등록", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
    @PostMapping("/{userId}/support")
    public ResponseEntity<ResponseSupport> createSupport(@PathVariable("userId") Long supporterId, @RequestBody RequestSupport support) {

        log.info("Before add support data");
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SupportDto supportDto = mapper.map(support, SupportDto.class);
        supportDto.setSupporterId(supporterId);

        SupportDto createSupport = supportService.createSupport(supportDto);
        ResponseSupport responseSupport = mapper.map(createSupport, ResponseSupport.class);

        log.info("After added support data");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseSupport);
    }

<<<<<<< HEAD
=======
//    @ApiOperation(value = "내가 한 후원", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
    @GetMapping("/{user_id}/support/give")
    public ResponseEntity<List<ResponseSupport>> getGiveSupport(@PathVariable("user_id") Long userId) throws Exception {

        log.info("Before get give support data");

        Iterable<Support> giveSupportList = supportService.getSupportBySupporterId(userId);

        List<ResponseSupport> result = new ArrayList<>();
        giveSupportList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport.class));
        });

        log.info("After got give support data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

<<<<<<< HEAD
=======
//    @ApiOperation(value = "내가 받은 후원", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
    @GetMapping("/{user_id}/support/supported")
    public ResponseEntity<List<ResponseSupport>> getSupported(@PathVariable("user_id") Long userId) throws Exception {

        log.info("Before get supported data");

        Iterable<Support> supportedList = supportService.getSupportByBuskerId(userId);

        List<ResponseSupport> result = new ArrayList<>();
        supportedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseSupport.class));
        });

        log.info("After got supported data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
