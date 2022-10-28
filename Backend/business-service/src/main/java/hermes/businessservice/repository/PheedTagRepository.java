package hermes.businessservice.repository;

import hermes.businessservice.entity.PheedTag;
import org.springframework.data.repository.CrudRepository;

public interface PheedTagRepository extends CrudRepository<PheedTag, Long> {

    Iterable<PheedTag> findByTag(Long t);

    Iterable<PheedTag> findByTagId(Long t);

    PheedTag findByName(String tag);

    PheedTag[] findByPheedId(Long pheedId);
}
