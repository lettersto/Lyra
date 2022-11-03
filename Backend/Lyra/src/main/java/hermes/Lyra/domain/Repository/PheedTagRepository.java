package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.PheedTag;
import org.springframework.data.repository.CrudRepository;

public interface PheedTagRepository extends CrudRepository<PheedTag, Long> {

    Iterable<PheedTag> findByTag(Long t);

    Iterable<PheedTag> findByTagId(Long t);

    PheedTag findByName(String tag);

    PheedTag[] findByPheedId(Long pheedId);
}
