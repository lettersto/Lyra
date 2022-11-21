package hermes.businessservice.repository;

import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.Pheed;
import hermes.businessservice.entity.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;


public interface TagRepository extends CrudRepository<Tag, Long> {

    Tag getOne(Long id);

    @Transactional
    Tag findByName(String tag);

}
