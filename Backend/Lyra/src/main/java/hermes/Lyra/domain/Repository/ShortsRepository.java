package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Shorts;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShortsRepository extends CrudRepository<Shorts, Long> {
    List<Shorts> findByRegionCode(String regionCode);
}
