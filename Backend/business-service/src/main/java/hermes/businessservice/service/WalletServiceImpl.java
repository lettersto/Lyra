package hermes.businessservice.service;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;
import hermes.businessservice.repository.WalletRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    @Autowired
    public WalletServiceImpl(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
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


