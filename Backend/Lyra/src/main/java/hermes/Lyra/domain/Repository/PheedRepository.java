package hermes.Lyra.domain.Repository;


import hermes.Lyra.domain.Category;
import hermes.Lyra.domain.Pheed;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PheedRepository extends CrudRepository<Pheed, Long> {


    Iterable<Pheed> findByCategory(@Param(value="category") Category category);

    Pheed getOne(Long pheedId);

    @Query(value="SELECT b FROM Pheed b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword%")
    Iterable<Pheed> findBySearch(String keyword);

    Iterable<Pheed> findByUserId(Long userId);

    Iterable<Pheed> findAll(Pageable pageable);
}
