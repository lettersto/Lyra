package hermes.businessservice.repository;

import hermes.businessservice.entity.PheedTag;
import hermes.businessservice.entity.Tag;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PheedTagRepository extends CrudRepository<PheedTag, Long> {

    List<PheedTag> findByTag(Tag t);

    List<PheedTag> findByName(String tag);
}
