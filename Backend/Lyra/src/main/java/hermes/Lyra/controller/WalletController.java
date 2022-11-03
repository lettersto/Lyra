package hermes.Lyra.controller;


import hermes.Lyra.Service.WalletService;
import hermes.Lyra.domain.Wallet;
import hermes.Lyra.dto.WalletDto;
import hermes.Lyra.vo.RequestWallet;
import hermes.Lyra.vo.ResponseWallet;
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


    @PatchMapping("/{id}/wallet")
    public ResponseEntity<String> updateWallet(@PathVariable("id") Long userId, @RequestParam Long coin) {

        log.info("Before update wallet data");

        Wallet wallet = walletService.getWalletByUserId(userId);
        walletService.updateWallet(wallet, coin);

        log.info("After updated wallet data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }



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
