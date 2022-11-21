package hermes.Lyra.Service;

import hermes.Lyra.domain.Repository.WalletRepository;
import hermes.Lyra.dto.ChargeDto;
import hermes.Lyra.domain.Charge;
import hermes.Lyra.domain.Wallet;
import hermes.Lyra.domain.Repository.ChargeRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class ChargeServiceImpl implements ChargeService {

    private final ChargeRepository chargeRepository;

    private final WalletRepository walletRepository;

    public ChargeServiceImpl(ChargeRepository chargeRepository, WalletRepository walletRepository) {
        this.chargeRepository = chargeRepository;
        this.walletRepository = walletRepository;
    }


    @Override
    public Iterable<Charge> getChargeByAll(Long walletId) {
        Optional<Wallet> w = walletRepository.findById(walletId);
        return chargeRepository.findByWallet(w.get());
    }

    @Override
    public ChargeDto createCharge(ChargeDto chargeDto, Long walletId) {
        Optional<Wallet> w = walletRepository.findById(walletId);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Charge charge = mapper.map(chargeDto, Charge.class);

        charge.setWallet(w.get());

        chargeRepository.save(charge);

        ChargeDto returnValue = mapper.map(charge, ChargeDto.class);

        return returnValue;
    }
}
