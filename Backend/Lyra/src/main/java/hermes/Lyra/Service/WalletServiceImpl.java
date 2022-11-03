package hermes.Lyra.Service;


import hermes.Lyra.domain.Repository.ChargeRepository;
import hermes.Lyra.domain.Repository.WalletRepository;
import hermes.Lyra.domain.Wallet;
import hermes.Lyra.dto.WalletDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    private final ChargeRepository chargeRepository;

    @Autowired
    public WalletServiceImpl(WalletRepository walletRepository, ChargeRepository chargeRepository) {
        this.walletRepository = walletRepository;
        this.chargeRepository = chargeRepository;
    }


    @Override
    public WalletDto createWallet(WalletDto walletDto) {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Wallet wallet = mapper.map(walletDto, Wallet.class);

        wallet.setCoin(0L);

        walletRepository.save(wallet);

        WalletDto returnValue = mapper.map(wallet, WalletDto.class);

        return returnValue;
    }

    @Override
    public void deleteWallet(Long userId) {
        Wallet w = walletRepository.getByUserId(userId);

        chargeRepository.deleteByWallet(w);

        walletRepository.deleteByUserId(userId);
    }

    @Override
    public void updateWallet(Wallet wallet, Long coin) {
        wallet.setCoin(coin);
        walletRepository.save(wallet);
    }

    @Override
    public Wallet getWalletByUserId(Long userId) {
        return walletRepository.findByUserId(userId);
    }
}


