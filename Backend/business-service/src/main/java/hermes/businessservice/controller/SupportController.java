package hermes.businessservice.controller;

import hermes.businessservice.dto.SupportDto;
import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.service.SupportService;
import hermes.businessservice.vo.RequestSupport;
import hermes.businessservice.vo.RequestWallet;
import hermes.businessservice.vo.ResponseSupport;
import hermes.businessservice.vo.ResponseWallet;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/business-service")
@Slf4j
public class SupportController {

    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }

    SupportService supportService;

    //    @ApiOperation(value = "새로운 후원 등록", response = String.class)
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
}
