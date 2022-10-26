package hermes.businessservice.repository;

import hermes.businessservice.entity.Pheed;
import org.springframework.data.repository.CrudRepository;

public interface PheedRepository extends CrudRepository<Pheed, Long> {
    Iterable<Pheed> findByCategory(String category);
}
