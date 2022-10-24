package hermes.businessservice.service;

import hermes.businessservice.dto.WalletDto;

public interface WalletService {

    WalletDto getWallet(Long userId);
    WalletDto createWallet(WalletDto walletDto);

}
