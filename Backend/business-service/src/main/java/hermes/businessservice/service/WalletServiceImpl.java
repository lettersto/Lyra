package hermes.businessservice.service;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;
import hermes.businessservice.repository.WalletRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WalletServiceImpl implements WalletService {

    WalletRepository walletRepository;

    @Autowired
    public WalletServiceImpl(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    @Override
    public WalletDto getWallet(Long userId) {
        return null;
    }

    @Override
    public WalletDto createWallet(WalletDto walletDto) {
        walletDto.setUserId(UUID.randomUUID().getMostSignificantBits());

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Wallet wallet = mapper.map(walletDto, Wallet.class);

        walletRepository.save(wallet);

        WalletDto returnWalletDto = mapper.map(wallet, WalletDto.class);

        return returnWalletDto;
    }


}
