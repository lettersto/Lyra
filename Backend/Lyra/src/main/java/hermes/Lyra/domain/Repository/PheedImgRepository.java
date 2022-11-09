package hermes.Lyra.domain.Repository;

import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.PheedImg;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface PheedImgRepository extends CrudRepository<PheedImg, Long> {

    @Transactional
    void deleteByPheed(Pheed newPheed);
}
