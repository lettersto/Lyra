package hermes.businessservice.service;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;

public interface WalletService {

    WalletDto createWallet(WalletDto walletDto);

    Iterable<Wallet> getWalletByUserId(Long userId);

//    int deleteWallet(Long walletId);
}
