package hermes.Lyra.domain.Repository;


import hermes.Lyra.domain.Tag;
import org.springframework.data.repository.CrudRepository;


import javax.transaction.Transactional;


public interface TagRepository extends CrudRepository<Tag, Long> {

    Tag getOne(Long id);

    @Transactional
    Tag findByName(String tag);

}
