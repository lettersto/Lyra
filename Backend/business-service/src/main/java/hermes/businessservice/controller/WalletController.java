package hermes.businessservice.controller;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;
import hermes.businessservice.service.WalletService;
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
public class WalletController {

    WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

//    @ApiOperation(value = "새로운 지갑 등록", response = String.class)
    @PostMapping("/{userId}/wallet")
    public ResponseEntity<ResponseWallet> createWallet(@RequestBody Wallet wallet) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        WalletDto walletDto = mapper.map(wallet, WalletDto.class);
        walletService.createWallet(walletDto);

        ResponseWallet responseWallet = mapper.map(walletDto, ResponseWallet.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseWallet);
    }


}
