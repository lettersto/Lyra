package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Shorts;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface ShortsRepository extends CrudRepository<Shorts, Long> {
//    List<Shorts> findByRegionCode(String regionCode);

    List<Shorts> findByTimeBetweenAndRegionCode(Timestamp stmStamp, Timestamp etmStamp, String regionCode);
}
