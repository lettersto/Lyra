package hermes.businessservice.controller;

import hermes.businessservice.dto.ChargeDto;
import hermes.businessservice.entity.Charge;
import hermes.businessservice.service.ChargeService;
import hermes.businessservice.vo.RequestCharge;
import hermes.businessservice.vo.ResponseCharge;
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
public class ChargeController {

    ChargeService chargeService;

    public ChargeController(ChargeService chargeService) {
        this.chargeService = chargeService;
    }

    // 지갑 별 충전 현황
    @GetMapping("/wallet/{wallet_id}/charge")
    public ResponseEntity<List<ResponseCharge>> getCharges(@PathVariable("wallet_id") Long walletId) throws Exception {
        log.info("Before get charges data");
        Iterable<Charge> chargeList = chargeService.getChargeByAll(walletId);

        List<ResponseCharge> result = new ArrayList<>();

        chargeList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCharge.class));
        });

        log.info("After got charges data");

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    // 충전
    @PostMapping("/wallet/{wallet_id}/charge")
    public ResponseEntity<String> createCharge(@PathVariable("wallet_id") Long walletId, @RequestBody RequestCharge charge) throws Exception {

        log.info("Before create charge data");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ChargeDto chargeDto = mapper.map(charge, ChargeDto.class);


        ChargeDto createCharge = chargeService.createCharge(chargeDto, walletId);


        log.info("After create comment data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}
