package hermes.Lyra.Service;


import hermes.Lyra.domain.Support;
import hermes.Lyra.dto.SupportDto;

public interface SupportService {
    SupportDto createSupport(SupportDto supportDto);

    Iterable<Support> getSupportBySupporterId(Long supporterId);

    Iterable<Support> getSupportByBuskerId(Long buskerId);
}
