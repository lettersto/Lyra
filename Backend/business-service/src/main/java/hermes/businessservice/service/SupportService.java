package hermes.businessservice.service;

import hermes.businessservice.dto.SupportDto;
import hermes.businessservice.entity.Support;

public interface SupportService {
    SupportDto createSupport(SupportDto supportDto);

    Iterable<Support> getSupportBySupporterId(Long supporterId);

    Iterable<Support> getSupportByBuskerId(Long buskerId);
}
