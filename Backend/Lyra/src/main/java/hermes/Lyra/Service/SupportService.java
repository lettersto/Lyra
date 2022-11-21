package hermes.Lyra.Service;


import hermes.Lyra.domain.Support;
import hermes.Lyra.dto.SupportDto;
import hermes.Lyra.vo.RequestSupport2;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.List;

public interface SupportService {
//    SupportDto createSupport(SupportDto supportDto);

    SupportDto createSupport(SupportDto supportDto, Long pheedId);

//    Iterable<Support> getSupportBySupporterId(Long supporterId);
//
//    Iterable<Support> getSupportByBuskerId(Long buskerId);

    List<Support> getSupportBySupporterId(Long userId, Timestamp startTime, Timestamp endTime, Pageable pageable);

    List<Support> getSupportByBuskerId(Long userId, Timestamp startTime, Timestamp endTime, Pageable pageable);

    Iterable<Support> getSupportsByChat(Long pheedId);

    int getTotalCoin(Long pheedId);
}
