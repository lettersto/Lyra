package hermes.Lyra.controller;

import hermes.Lyra.Service.TalkService;
import hermes.Lyra.Service.UserService;
//import hermes.Lyra.config.LyraUserDetails;
import hermes.Lyra.config.LyraUserDetails;
import hermes.Lyra.domain.Talk;
import hermes.Lyra.dto.Message;
import hermes.Lyra.dto.StatusEnum;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/talk")
@Slf4j
public class TalkController {

    @Autowired
    UserService userService;
    @Autowired
    TalkService talkService;

//     자기 메시지 조회
    @ApiOperation(value = "유저 아이디 기준 톡 조회하기", notes = "유저 아이디 기준 톡 조회하기")
    @GetMapping("/{userId}")
    public ResponseEntity<?> myTalk(@PathVariable("userId") Long userId) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<Talk> talks = talkService.myTalk(userId);
            message.setStatus(StatusEnum.OK);
            message.setMessage("톡 불러오기 성공");
            message.setData(talks);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("톡 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
