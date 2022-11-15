package hermes.Lyra.controller;

import hermes.Lyra.Service.WishService;
import hermes.Lyra.Service.UserService;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;
import hermes.Lyra.dto.Message;
import hermes.Lyra.dto.StatusEnum;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequestMapping("/wish")
public class WishController {

    @Autowired
    WishService wishService;

    @Autowired
    UserService userService;

    @ApiOperation(value = "피드에 좋아요/좋아요 취소를 누른다.",notes = "피드에 좋아요/좋아요 취소를 누른다")
    @PostMapping("/{userId}/{pheedId}")
    public ResponseEntity<?> wishPheed(
            @PathVariable("userId") Long userId,
            @PathVariable("pheedId") Long pheedId)  {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        int check = wishService.wishPheed(userId, pheedId);
        if (check==1) {
            message.setStatus(StatusEnum.OK);
            message.setMessage("좋아요 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } else if (check==2) {
            message.setStatus(StatusEnum.OK);
            message.setMessage("좋아요 취소 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } else {
            message.setStatus(StatusEnum.BAD_REQUEST);
            if (check==3) message.setMessage("없는 유저입니다");
            else message.setMessage("없는 피드입니다");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "유저가 좋아요한 피드 리스트를 조회한다.",notes = "유저가 좋아요한 피드 리스트를 조회한다")
    @GetMapping("pheedlist/{userId}")
    public ResponseEntity<?> searchWishPheedList(
            @PathVariable("userId") Long userId,
            @PageableDefault(size = 30, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<Pheed> pheedList = wishService.searchPheedList(userId, pageable);
        message.setStatus(StatusEnum.OK);
        message.setMessage("좋아요한 피드 리스트 조회 성공");
        message.setData(pheedList);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "피드를 좋아요한 유저 리스트를 조회한다.",notes = "피드를 좋아요한 유저 리스트를 조회한다")
    @GetMapping("userlist/{pheedId}")
    public ResponseEntity<?> searchWishUserList(
            @PathVariable("pheedId") Long pheedId){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<User> userList = wishService.searchUserList(pheedId);
        message.setStatus(StatusEnum.OK);
        message.setMessage("좋아요한 유저 리스트 조회 성공");
        message.setData(userList);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

}
