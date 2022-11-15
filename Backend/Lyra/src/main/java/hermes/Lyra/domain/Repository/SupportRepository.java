package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Support;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface SupportRepository extends CrudRepository<Support, Long> {
//    Iterable<Support> findBySupporterId(Long supporterId);
//
//    Iterable<Support> findByBuskerId(Long buskerId);

    Iterable<Support> findByBuskerIdAndPheedId(Long id, Long pheedId);

    Iterable<Support> findByPheedId(Long pheedId);

    List<Support> findByTimeBetweenAndSupporterId(Timestamp startTime, Timestamp endTime, Long userId, Pageable pageable);

    List<Support> findByTimeBetweenAndBuskerId(Timestamp startTime, Timestamp endTime, Long userId, Pageable pageable);

    List<Support> findByBuskerId(Long userId, Pageable pageable);

    List<Support> findBySupporterId(Long userId, Pageable pageable);
}
