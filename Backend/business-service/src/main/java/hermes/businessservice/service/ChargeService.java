package hermes.businessservice.service;

import hermes.businessservice.dto.ChargeDto;
import hermes.businessservice.entity.Charge;

public interface ChargeService {
    Iterable<Charge> getChargeByAll(Long walletId);

    ChargeDto createCharge(ChargeDto chargeDto, Long walletId);
}
