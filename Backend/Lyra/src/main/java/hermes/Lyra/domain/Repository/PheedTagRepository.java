package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.PheedTag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PheedTagRepository extends CrudRepository<PheedTag, Long> {

//    Iterable<PheedTag> findByTag(Long t);

    List<PheedTag> findByTagId(Long t, Pageable pageable);

//    PheedTag findByName(String tag);

    PheedTag[] findByPheedId(Long pheedId);
}
