package hermes.Lyra.controller;


import hermes.Lyra.Service.CommentService;
import hermes.Lyra.domain.Comment;
import hermes.Lyra.dto.CommentDto;
import hermes.Lyra.vo.RequestComment;
import hermes.Lyra.vo.ResponseComment;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pheed")
@Slf4j
public class CommentController {

    CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{pheed_id}/comment")
    public ResponseEntity<List<ResponseComment>> getComments(@PathVariable("pheed_id") Long pheedId) throws Exception {

        log.info("Before get comments data");
        Iterable<Comment> commentList = commentService.getCommentByAll(pheedId);

        List<ResponseComment> result = new ArrayList<>();

        commentList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseComment.class));
        });

        log.info("After got comments data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{pheed_id}/comment/{comment_id}")
    public ResponseEntity<Optional<Comment>> getComment(@PathVariable("pheed_id") Long pheedId, @PathVariable("comment_id") Long commentId) throws Exception {

        log.info("Before get comment data");

        Optional<Comment> comment = commentService.getCommentById(commentId);


        log.info("After got comment data");

        return ResponseEntity.status(HttpStatus.OK).body(comment);
    }


    @PatchMapping("/{pheed_id}/comment/{comment_id}")
    public ResponseEntity<String> updateComment(@PathVariable("pheed_id") Long pheedId, @PathVariable("comment_id") Long commentId, @RequestBody RequestComment comment) throws Exception {

        log.info("Before update comment data");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        CommentDto commentDto = mapper.map(comment, CommentDto.class);

        CommentDto updateComment = commentService.updateComment(commentDto, pheedId, commentId);

        log.info("After update comment data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @DeleteMapping("/{pheed_id}/comment/{comment_id}")
    public ResponseEntity<String> deleteComment(@PathVariable("pheed_id") Long pheedId, @PathVariable("comment_id") Long commentId) throws Exception {

        log.info("Before delete comment data");

        commentService.deleteComment(commentId);

        log.info("After deleted comment data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @PostMapping("/pheed/{pheed_id}/comment")
    public ResponseEntity<String> createComment(@RequestParam("user_id") Long userId, @PathVariable("pheed_id") Long pheedId, @RequestBody RequestComment comment) throws Exception {

        log.info("Before create comment data");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        CommentDto commentDto = mapper.map(comment, CommentDto.class);

        commentDto.setUserId(userId);

        CommentDto createComment = commentService.createComment(commentDto, pheedId);


        log.info("After create comment data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }



}
