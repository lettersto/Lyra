package hermes.businessservice.controller;

import hermes.businessservice.dto.CommentDto;
import hermes.businessservice.entity.Comment;
import hermes.businessservice.service.CommentService;
import hermes.businessservice.vo.RequestComment;
import hermes.businessservice.vo.ResponseComment;
<<<<<<< HEAD
<<<<<<< HEAD
=======
//import io.swagger.annotations.ApiOperation;
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//import io.swagger.annotations.ApiOperation;
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
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
@RequestMapping("/business-service")
@Slf4j
public class CommentController {

    CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "피드 댓글 전체 확인", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "피드 댓글 전체 확인", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @GetMapping("/pheed/{pheed_id}/comment")
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "댓글 상세 확인", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "댓글 상세 확인", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @GetMapping("/pheed/{pheed_id}/comment/{comment_id}")
    public ResponseEntity<Optional<Comment>> getComment(@PathVariable("pheed_id") Long pheedId, @PathVariable("comment_id") Long commentId) throws Exception {

        log.info("Before get comment data");

        Optional<Comment> comment = commentService.getCommentById(commentId);


        log.info("After got comment data");

        return ResponseEntity.status(HttpStatus.OK).body(comment);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "댓글 수정", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "댓글 수정", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @PatchMapping("/pheed/{pheed_id}/comment/{comment_id}")
    public ResponseEntity<String> updateComment(@PathVariable("pheed_id") Long pheedId, @PathVariable("comment_id") Long commentId, @RequestBody RequestComment comment) throws Exception {

        log.info("Before update comment data");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        CommentDto commentDto = mapper.map(comment, CommentDto.class);

        CommentDto updateComment = commentService.updateComment(commentDto, pheedId, commentId);

        log.info("After update comment data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "댓글 삭제", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "댓글 삭제", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @DeleteMapping("/pheed/{pheed_id}/comment/{comment_id}")
    public ResponseEntity<String> deleteComment(@PathVariable("pheed_id") Long pheedId, @PathVariable("comment_id") Long commentId) throws Exception {

        log.info("Before delete comment data");

        commentService.deleteComment(commentId);

        log.info("After deleted comment data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
//    @ApiOperation(value = "댓글 등록", response = String.class)
>>>>>>> b8667fae1e4b9ea6b38d4f335d388c62d31ede02
=======
//    @ApiOperation(value = "댓글 등록", response = String.class)
>>>>>>> 42fbc41009bb584918b2ecda9930bf8fbc4ef0a0
    @PostMapping("/{user_id}/pheed/{pheed_id}/comment")
    public ResponseEntity<String> createComment(@PathVariable("user_id") Long userId, @PathVariable("pheed_id") Long pheedId, @RequestBody RequestComment comment) throws Exception {

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
