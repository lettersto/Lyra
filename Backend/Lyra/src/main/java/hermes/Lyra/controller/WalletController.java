package hermes.Lyra.controller;


import hermes.Lyra.Service.WalletService;
import hermes.Lyra.domain.Wallet;
import hermes.Lyra.dto.WalletDto;
import hermes.Lyra.vo.RequestWallet;
import hermes.Lyra.vo.ResponseWallet;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallet")
@Slf4j
public class WalletController {

    WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }


    @ApiOperation(value = "지갑 데이터 생성")
    @PostMapping("")
    public ResponseEntity<String> createWallet(@RequestParam("user_id") Long userId, @RequestBody RequestWallet wallet) {

        log.info("Before add wallet data");
        ModelMapper mapper = new ModelMapper();

        WalletDto walletDto = mapper.map(wallet, WalletDto.class);
        walletDto.setUserId(userId);

        Boolean createWallet = walletService.createWallet(walletDto);

        if (createWallet) {
            log.info("After added wallet data");
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }

        return new ResponseEntity<String>("fail", HttpStatus.OK);

    }

    @ApiOperation(value = "지갑 정보 불러오기")
    @GetMapping("")
    public ResponseEntity<ResponseWallet> getWallet(@RequestParam("user_id") Long userId) throws Exception {

        log.info("Before get wallet data");
        Wallet result = walletService.getWalletByUserId(userId);

        ModelMapper mapper = new ModelMapper();

        ResponseWallet responseWallet = mapper.map(result, ResponseWallet.class);


        log.info("After got wallet data");

        return ResponseEntity.status(HttpStatus.OK).body(responseWallet);
    }


//    @PatchMapping("")
//    public ResponseEntity<String> updateWallet(@RequestParam("user_id") Long userId, @RequestParam Long coin) {
//
//        log.info("Before update wallet data");
//
//        Wallet wallet = walletService.getWalletByUserId(userId);
//        walletService.updateWallet(wallet, coin);
//
//        log.info("After updated wallet data");
//
//        return new ResponseEntity<String>("success", HttpStatus.OK);
//    }



    @ApiOperation(value = "지갑 정보 삭제")
    @DeleteMapping("")
    public ResponseEntity<String> deleteWallet(@RequestParam("user_id") Long userId) {

        log.info("Before delete wallet data");

        walletService.deleteWallet(userId);

        log.info("After deleted wallet data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


}
