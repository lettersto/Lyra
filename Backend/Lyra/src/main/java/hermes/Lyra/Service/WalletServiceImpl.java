package hermes.Lyra.Service;


import hermes.Lyra.domain.Repository.ChargeRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Repository.WalletRepository;
import hermes.Lyra.domain.Wallet;
import hermes.Lyra.dto.WalletDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    private final ChargeRepository chargeRepository;

    private final UserRepository2 userRepository2;

    @Autowired
    public WalletServiceImpl(WalletRepository walletRepository, ChargeRepository chargeRepository, UserRepository2 userRepository2) {
        this.walletRepository = walletRepository;
        this.chargeRepository = chargeRepository;
        this.userRepository2 = userRepository2;
    }


    @Override
    public boolean createWallet(WalletDto walletDto) {



        try {

            ModelMapper mapper = new ModelMapper();

            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

            Wallet wallet = mapper.map(walletDto, Wallet.class);


            wallet.setUser(userRepository2.findById(walletDto.getUserId()).get());

//            wallet.setCoin(0L);

            walletRepository.save(wallet);

            return true;

        } catch(Exception e) {
            return false;
        }

    }

    @Override
    @Transactional
    public void deleteWallet(Long userId) {
        Wallet w = walletRepository.getByUserId(userId);

        chargeRepository.deleteByWallet(w);

        walletRepository.deleteByUserId(userId);
    }

//    @Override
//    public void updateWallet(Wallet wallet, Long coin) {
//        wallet.setCoin(coin);
//        walletRepository.save(wallet);
//    }

    @Override
    public Wallet getWalletByUserId(Long userId) {

        return walletRepository.findByUser(userRepository2.findById(userId));
    }
}


