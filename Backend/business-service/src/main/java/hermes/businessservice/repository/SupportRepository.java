package hermes.businessservice.repository;

import hermes.businessservice.entity.Support;
import org.springframework.data.repository.CrudRepository;

public interface SupportRepository extends CrudRepository<Support, Long> {
    Iterable<Support> findBySupporterId(Long supporterId);

    Iterable<Support> findByBuskerId(Long buskerId);
}
