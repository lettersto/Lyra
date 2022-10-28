package hermes.businessservice.repository;

import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.Pheed;
import hermes.businessservice.entity.PheedTag;
import hermes.businessservice.entity.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PheedRepository extends CrudRepository<Pheed, Long> {


    Iterable<Pheed> findByCategory(@Param(value="category") Category category);

    Pheed getOne(Long pheedId);

    @Query(value="SELECT b FROM Pheed b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword%")
    Iterable<Pheed> findBySearch(String keyword);

    Iterable<Pheed> findByUserId(Long userId);

}
