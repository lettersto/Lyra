package hermes.businessservice.service;

import hermes.businessservice.dto.CommentDto;
import hermes.businessservice.entity.Comment;

import java.util.Optional;

public interface CommentService {
    Iterable<Comment> getCommentByAll(Long pheedId);

    Optional<Comment> getCommentById(Long commentId);

    CommentDto createComment(CommentDto commentDto, Long pheedId);

    CommentDto updateComment(CommentDto commentDto, Long pheedId, Long commentId);

    void deleteComment(Long commentId);
}
