package hermes.Lyra.domain.Repository;


import hermes.Lyra.domain.Comment;
import hermes.Lyra.domain.Pheed;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    Iterable<Comment> findByPheed(Pheed pheed);

    void deleteByPheedId(Long pheedId);
}
