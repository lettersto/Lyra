package hermes.Lyra.Service;

import hermes.Lyra.domain.Comment;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Repository.CommentRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.dto.CommentDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class CommentServiceImpl implements CommentService {

    private final PheedRepository pheedRepository;


    private final CommentRepository commentRepository;

    private final UserRepository2 userRepository2;

    @Autowired
    public CommentServiceImpl(PheedRepository pheedRepository, CommentRepository commentRepository, UserRepository2 userRepository2) {
        this.pheedRepository = pheedRepository;
        this.commentRepository = commentRepository;
        this.userRepository2 = userRepository2;
    }


    @Override
    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId).get();
    }

    @Override
    public CommentDto createComment(CommentDto commentDto, Long pheedId) {
        Optional<Pheed> p = pheedRepository.findById(pheedId);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Comment comment = mapper.map(commentDto, Comment.class);

        comment.setPheed(p.get());

        comment.setUser(userRepository2.findById(commentDto.getUserId()).get());

        commentRepository.save(comment);

        CommentDto returnValue = mapper.map(comment, CommentDto.class);

        return returnValue;
    }


    @Override
    public CommentDto updateComment(CommentDto commentDto, Long pheedId, Long commentId) {

        Optional<Comment> c = commentRepository.findById(commentId);
        commentDto.setUserId(c.get().getUser().getId());
        commentDto.setPheed(pheedRepository.findById(pheedId).get());
        commentDto.setTime(c.get().getTime());

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Comment comment = mapper.map(commentDto, Comment.class);

        comment.setId(commentId);

        comment.setUser(c.get().getUser());

        commentRepository.save(comment);

        CommentDto returnValue = mapper.map(comment, CommentDto.class);


        return returnValue;
    }

    @Override
    public void deleteComment(Long commentId) {

        commentRepository.deleteById(commentId);

    }



    @Override
    public Iterable<Comment> getCommentByAll(Long pheedId) {
        Optional<Pheed> p = pheedRepository.findById(pheedId);
        return commentRepository.findByPheed(p.get());
    }
}
