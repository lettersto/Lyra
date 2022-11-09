package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Support;
import org.springframework.data.repository.CrudRepository;

public interface SupportRepository extends CrudRepository<Support, Long> {
    Iterable<Support> findBySupporterId(Long supporterId);

    Iterable<Support> findByBuskerId(Long buskerId);
}
