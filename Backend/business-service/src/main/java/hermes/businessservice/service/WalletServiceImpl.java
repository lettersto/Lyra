package hermes.businessservice.service;

import hermes.businessservice.dto.WalletDto;
import hermes.businessservice.entity.Wallet;
import hermes.businessservice.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

//    @Override
    // walletid로 삭제가 아니라 userid로 삭제되길 원함
//    public int deleteWallet(Long walletId) {
//        walletRepository.delete(walletId);
//        return 0;
//    }

    @Override
    public Iterable<Wallet> getWalletByUserId(Long userId) {
        return walletRepository.findByUserId(userId);
    }
}


