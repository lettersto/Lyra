package hermes.Lyra.Service;


import hermes.Lyra.domain.Wallet;
import hermes.Lyra.dto.WalletDto;

public interface WalletService {

    boolean createWallet(WalletDto walletDto);

    Wallet getWalletByUserId(Long userId);

    void deleteWallet(Long userId);

//    void updateWallet(Wallet wallet, Long coin);
}
