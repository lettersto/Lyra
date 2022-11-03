package hermes.Lyra.Service;

import hermes.Lyra.dto.CommentDto;
import hermes.Lyra.domain.Comment;

import java.util.Optional;

public interface CommentService {
    Iterable<Comment> getCommentByAll(Long pheedId);

    Comment getCommentById(Long commentId);

    CommentDto createComment(CommentDto commentDto, Long pheedId);

    CommentDto updateComment(CommentDto commentDto, Long pheedId, Long commentId);

    void deleteComment(Long commentId);
}
