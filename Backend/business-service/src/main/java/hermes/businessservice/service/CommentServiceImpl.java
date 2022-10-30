package hermes.businessservice.service;

import hermes.businessservice.dto.CommentDto;
import hermes.businessservice.entity.Comment;
import hermes.businessservice.entity.Pheed;
import hermes.businessservice.repository.CommentRepository;
import hermes.businessservice.repository.PheedRepository;
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

    @Autowired
    public CommentServiceImpl(PheedRepository pheedRepository, CommentRepository commentRepository) {
        this.pheedRepository = pheedRepository;
        this.commentRepository = commentRepository;
    }


    @Override
    public Optional<Comment> getCommentById(Long commentId) {
        return commentRepository.findById(commentId);
    }

    @Override
    public CommentDto createComment(CommentDto commentDto, Long pheedId) {
        Optional<Pheed> p = pheedRepository.findById(pheedId);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Comment comment = mapper.map(commentDto, Comment.class);

        comment.setPheed(p.get());

        commentRepository.save(comment);

        CommentDto returnValue = mapper.map(comment, CommentDto.class);

        return returnValue;
    }


    @Override
    public CommentDto updateComment(CommentDto commentDto, Long pheedId, Long commentId) {

        Optional<Comment> c = commentRepository.findById(commentId);
        commentDto.setUserId(c.get().getUserId());
        commentDto.setPheed(pheedRepository.findById(pheedId).get());
        commentDto.setTime(c.get().getTime());

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Comment comment = mapper.map(commentDto, Comment.class);

        comment.setId(commentId);

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
