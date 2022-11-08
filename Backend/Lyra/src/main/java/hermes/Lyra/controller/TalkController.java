package hermes.Lyra.controller;

import hermes.Lyra.Service.TalkService;
import hermes.Lyra.Service.UserService;
//import hermes.Lyra.config.LyraUserDetails;
import hermes.Lyra.config.LyraUserDetails;
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

@RestController
@RequestMapping("/talk")
@Slf4j
public class TalkController {

    @Autowired
    UserService userService;
    @Autowired
    TalkService talkService;

//     자기 메시지 조회
    @ApiOperation(value = "자기 메시지 요청하기", notes = "자기 메시지 요청하기")
    @GetMapping("/me")
    public ResponseEntity<?> myTalk(
            @RequestHeader(value = "REFRESH-TOKEN") String refreshToken
    ) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            talkService.myTalk(refreshToken);
            message.setStatus(StatusEnum.OK);
            message.setMessage("개인 톡 조회 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (Exception e){
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("REFRESH TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }

//    @ApiOperation(value = "소셜로그인 - 멤버정보 요청",notes = "발급받은 accessToken으로 멤버정보를 요청한다.")
//    @GetMapping("/me")
//    public ResponseEntity<?> getMember(
//            @RequestHeader(value="X-AUTH-TOKEN") String token) throws Exception {
//        Message message = new Message();
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//
//        message.setStatus(StatusEnum.OK);
//        message.setMessage("access token으로 정보 불러오기 성공");
//        message.setData(userService.getUser(token));
//        return new ResponseEntity<>(message, headers, HttpStatus.OK);
//
//    }

    @ApiOperation(value = "로그아웃을 요청한다.",notes = "refresh 토큰으로 로그아웃을 요청한다.") //리프레쉬토큰으로
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value="REFRESH-TOKEN") String refreshToken) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            userService.logout(refreshToken);
            message.setStatus(StatusEnum.OK);
            message.setMessage("로그아웃 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (Exception e){
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("ACCESS TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }

    // 메시지 생성
//    @PostMapping("")
//    public ResponseEntity<? extends BaseResponseBody> createMessage(@RequestBody MessagePostReq registerInfo) {
//        messageService.createMessage(registerInfo);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
}
