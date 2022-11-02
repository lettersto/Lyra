package hermes.businessservice.controller;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;
import hermes.businessservice.service.WalletService;
import hermes.businessservice.vo.RequestWallet;
import hermes.businessservice.vo.ResponseWallet;
<<<<<<< HEAD
<<<<<<< HEAD
=======
//import io.swagger.annotations.ApiOperation;
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//import io.swagger.annotations.ApiOperation;
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "새로운 지갑 등록", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "새로운 지갑 등록", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "지갑 조회", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "지갑 조회", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @GetMapping("/{id}/wallet")
    public ResponseEntity<Wallet> getWallet(@PathVariable("id") Long userId) throws Exception {

        log.info("Before get wallet data");
        Wallet result = walletService.getWalletByUserId(userId);
//
//        List<ResponseWallet> result = new ArrayList<>();
//        walletList.forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponseWallet.class));
//        });

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


<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "코인 수량 변경", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "코인 수량 변경", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @PatchMapping("/{id}/wallet")
    public ResponseEntity<String> updateWallet(@PathVariable("id") Long userId, @RequestParam Long coin) {

        log.info("Before update wallet data");

        Wallet wallet = walletService.getWalletByUserId(userId);
        walletService.updateWallet(wallet, coin);

        log.info("After updated wallet data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "지갑 삭제", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "지갑 삭제", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @DeleteMapping("/{id}/wallet")
    public ResponseEntity<String> deleteWallet(@PathVariable("id") Long userId) {

        log.info("Before delete wallet data");

        walletService.deleteWallet(userId);

        log.info("After deleted wallet data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }


}
