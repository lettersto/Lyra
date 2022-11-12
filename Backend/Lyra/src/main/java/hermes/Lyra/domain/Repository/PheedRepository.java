package hermes.Lyra.domain.Repository;


import hermes.Lyra.domain.Category;
import hermes.Lyra.domain.Pheed;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface PheedRepository extends CrudRepository<Pheed, Long> {


    List<Pheed> findByCategory(@Param(value="category") Category category, Pageable pageable);

    Pheed getOne(Long pheedId);

    @Query(value="SELECT b FROM Pheed b WHERE b.title LIKE %:keyword% OR b.content LIKE %:keyword%")
    List<Pheed> findBySearch(String keyword, Pageable pageable);

    List<Pheed> findByUserId(Long userId, Pageable pageable);

    Iterable<Pheed> findAll(Pageable pageable);

    List<Pheed> findByRegionCode(String regionCode, Pageable pageable);

    List<Pheed> findByStartTimeBetweenAndState(Timestamp st, Timestamp et, int i);

    List<Pheed> findByUserIdAndState(Long userId, int i);

    List<Pheed> findByState(int i);
}
