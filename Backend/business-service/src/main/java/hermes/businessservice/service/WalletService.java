package hermes.businessservice.service;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;

public interface WalletService {

    WalletDto createWallet(WalletDto walletDto);

    Wallet getWalletByUserId(Long userId);

    void deleteWallet(Long userId);

    void updateWallet(Wallet wallet, Long coin);
}
