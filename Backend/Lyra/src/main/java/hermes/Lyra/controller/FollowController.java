package hermes.Lyra.controller;

import hermes.Lyra.Service.FollowService;
import hermes.Lyra.Service.UserService;
import hermes.Lyra.domain.User;
import hermes.Lyra.dto.Message;
import hermes.Lyra.dto.StatusEnum;
import hermes.Lyra.vo.ResponseFollower;
import hermes.Lyra.vo.ResponseFollowing;
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
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    FollowService followService;

    @Autowired
    UserService userService;

    @ApiOperation(value = "유저에 팔로우/팔로우 취소를 누른다.",notes = "유저에 팔로우/팔로우 취소를 누른다")
    @PostMapping("/{followerId}/{followingId}")
    public ResponseEntity<?> follow(
            @PathVariable("followerId") Long followerId,
            @PathVariable("followingId") Long followingId)  {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        int check = followService.follow(followerId, followingId);
        if (check==1) {
            message.setStatus(StatusEnum.OK);
            message.setMessage("팔로우 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } else if (check==2) {
            message.setStatus(StatusEnum.OK);
            message.setMessage("팔로우 취소 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } else {
            message.setStatus(StatusEnum.BAD_REQUEST);
            if (check==3) message.setMessage("팔로워 아이디를 잘못 입력했습니다");
            else message.setMessage("팔로잉 아이디를 잘못 입력했습니다");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "유저의 팔로워 리스트를 조회한다. 페이징0부터&닉네임순",notes = "유저의 팔로워 리스트를 조회한다")
    @GetMapping("followerList/{userId}")
    public ResponseEntity<?> followerList(
            @PathVariable("userId") Long userId,
            @PageableDefault(size = 20, sort = "followerId.nickname", direction = Sort.Direction.ASC) Pageable pageable){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<ResponseFollowing> followers = followService.searchFollowerList(userId, pageable);
        message.setStatus(StatusEnum.OK);
        message.setMessage("팔로워 리스트 조회 성공");
        message.setData(followers);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "유저의 팔로잉 리스트를 조회한다. 페이징0부터&닉네임순",notes = "유저의 팔로잉 리스트를 조회한다")
    @GetMapping("followingList/{userId}")
    public ResponseEntity<?> followingList(
            @PathVariable("userId") Long userId,
            @PageableDefault(size = 20, sort = "followingId.nickname", direction = Sort.Direction.ASC) Pageable pageable){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<ResponseFollower> followings = followService.searchFollowingList(userId, pageable);
        message.setStatus(StatusEnum.OK);
        message.setMessage("팔로잉 리스트 조회 성공");
        message.setData(followings);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "팔로잉 -> 팔로워 팔로우 중인지 확인한다.",notes = "팔로잉 -> 팔로워 팔로우 중인지 확인한다.")
    @GetMapping("{followerId}/{followingId}")
    public ResponseEntity<?> check(
            @PathVariable("followerId") Long followerId,
            @PathVariable("followingId") Long followingId){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        int check = followService.check(followerId, followingId);
        if (check==1) {
            message.setStatus(StatusEnum.OK);
            message.setMessage("팔로우한 상대방입니다");
            message.setData(true);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } else if (check==2) {
            message.setStatus(StatusEnum.OK);
            message.setMessage("팔로우한 상대방이 아닙니다");
            message.setData(false);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } else {
            message.setStatus(StatusEnum.BAD_REQUEST);
            if (check==3) message.setMessage("팔로워 아이디를 잘못 입력했습니다");
            else message.setMessage("팔로잉 아이디를 잘못 입력했습니다");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }
}
