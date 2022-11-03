package hermes.Lyra.Service;

import hermes.Lyra.dto.ChargeDto;
import hermes.Lyra.domain.Charge;

public interface ChargeService {
    Iterable<Charge> getChargeByAll(Long walletId);

    ChargeDto createCharge(ChargeDto chargeDto, Long walletId);
}
