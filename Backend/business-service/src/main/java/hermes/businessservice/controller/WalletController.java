package hermes.businessservice.controller;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;
import hermes.businessservice.service.WalletService;
import hermes.businessservice.vo.RequestWallet;
import hermes.businessservice.vo.ResponseWallet;
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
public class WalletController {

    WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

//    @ApiOperation(value = "새로운 지갑 등록", response = String.class)
    @PostMapping("/{id}/wallet")
    public ResponseEntity<ResponseWallet> createWallet(@PathVariable("id") Long userId, @RequestBody RequestWallet wallet) {

        log.info("Before add wallet data");
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        WalletDto walletDto = mapper.map(wallet, WalletDto.class);
        walletDto.setUserId(userId);

        WalletDto createWallet = walletService.createWallet(walletDto);
        ResponseWallet responseWallet = mapper.map(createWallet, ResponseWallet.class);

        log.info("After added wallet data");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseWallet);
    }

    //    @ApiOperation(value = "지갑 조회", response = String.class)
    @GetMapping("/{id}/wallet")
    public ResponseEntity<List<ResponseWallet>> getWallet(@PathVariable("id") Long userId) throws Exception {

        log.info("Before get wallet data");
        Iterable<Wallet> walletList = walletService.getWalletByUserId(userId);

        List<ResponseWallet> result = new ArrayList<>();
        walletList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseWallet.class));
        });

//
//        try {
//            Thread.sleep(1000);
//            throw new Exception("장애 발생");
//        } catch(InterruptedException ex) {
//            log.warn(ex.getMessage());
//        }

        log.info("After got wallet data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    //    @ApiOperation(value = "코인 수량 변경", response = String.class)
//    @PutMapping("/{id}/wallet")
//    public ResponseEntity<ResponseWallet> updateWallet(@PathVariable("id") Long userId, @RequestBody RequestWallet wallet) {
//
//        log.info("Before update wallet data");
//        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//
//        WalletDto walletDto = mapper.map(wallet, WalletDto.class);
//        walletDto.setUserId(userId);
//
//        WalletDto createWallet = walletService.createWallet(walletDto);
//        ResponseWallet responseWallet = mapper.map(createWallet, ResponseWallet.class);
//
//        log.info("After updated wallet data");
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseWallet);
//    }


//    @ApiOperation(value = "지갑 삭제", response = String.class)
    @DeleteMapping("/{id}/wallet")
    public ResponseEntity<String> deleteWallet(@PathVariable("id") Long userId) {

        log.info("Before delete wallet data");

        Iterable<Wallet> walletList = walletService.getWalletByUserId(userId);

        List<Wallet> result = new ArrayList<>();
        walletList.forEach(v -> {
            result.add(v);
        });

//        walletService.deleteWallet(result.get(0).getId());

        log.info("After deleted wallet data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }


}
