package hermes.Lyra.controller;

import hermes.Lyra.Service.AdminService;
import hermes.Lyra.Service.NoticeService;
import hermes.Lyra.Service.TalkService;
import hermes.Lyra.domain.Notice;
import hermes.Lyra.domain.Talk;
import hermes.Lyra.dto.Message;
import hermes.Lyra.dto.RequestDto.NoticeRequestDto;
import hermes.Lyra.dto.RequestDto.TalkRequestDto;
import hermes.Lyra.dto.ResponseDto.UserLoginResponseDto;
import hermes.Lyra.dto.StatusEnum;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;

@RestController
@RequestMapping("/admin")
@Slf4j
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    NoticeService noticeService;

    @Autowired
    TalkService talkService;

    @ApiOperation(value = "유저 권한을 변경한다.",notes = "관리자 -> 유저, 유저 -> 관리자")
    @PatchMapping("/{userId}")
    public ResponseEntity<?> changeRole(@PathVariable("userId") Long userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = adminService.changeRole(userId);
            message.setStatus(StatusEnum.OK);
            if(result==1){
                message.setMessage("유저 -> 관리자 권한 부여 성공");
            } else if (result==2) {
                message.setMessage("관리자 -> 유저 권한 부여 성공");
            } else {
                message.setMessage("없는 userId를 입력했습니다.");
            }
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "공지사항을 작성한다.",notes = "공지사항을 작성한다.")
    @PostMapping("/notice")
    public ResponseEntity<?> createNotice(
            @RequestBody NoticeRequestDto noticeRequestDto) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        Notice notice = noticeService.createNotice(noticeRequestDto);
        message.setStatus(StatusEnum.OK);
        message.setMessage("공지사항 생성 성공");
        message.setData(notice);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항을 수정한다.",notes = "공지사항을 수정한다.")
    @PatchMapping("/notice/{noticeId}")
    public ResponseEntity<?> updateNotice(
            @RequestBody NoticeRequestDto noticeRequestDto,
            @PathVariable("noticeId") Long noticeId
            ) {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = noticeService.updateNotice(noticeId, noticeRequestDto);
            if (result == 1) {
                message.setStatus(StatusEnum.OK);
                message.setMessage("공지사항 수정 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            } else {
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("공지사항 정보가 없습니다.");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "공지사항을 삭제한다.",notes = "공지사항을 삭제한다.")
    @DeleteMapping("/notice/{noticeId}")
    public ResponseEntity<?> deleteNotice(
            @PathVariable("noticeId") Long noticeId) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        noticeService.deleteNotice(noticeId);
        message.setStatus(StatusEnum.OK);
        message.setMessage("공지사항 삭제 성공");
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "개인 메시지를 작성한다.",notes = "개인 메시지를 작성한다.")
    @PostMapping("/talk/{userId}")
    public ResponseEntity<?> createTalk(
            @PathVariable("userId") Long userId,
            @RequestBody TalkRequestDto talkRequestDto) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        Talk talk = talkService.createTalk(userId, talkRequestDto);
        message.setStatus(StatusEnum.OK);
        message.setMessage("공지사항 생성 성공");
        message.setData(talk);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "개인 메시지를 수정한다.",notes = "개인 메시지를 수정한다.")
    @PatchMapping("/talk/{talkId}")
    public ResponseEntity<?> updateTalk(
            @RequestBody TalkRequestDto talkRequestDto,
            @PathVariable("talkId") Long talkId
    ) {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = talkService.updateTalk(talkId, talkRequestDto);
            if (result == 1) {
                message.setStatus(StatusEnum.OK);
                message.setMessage("개인 메시지 수정 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            } else {
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("개인 메시지 정보가 없습니다.");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "개인 메시지를 삭제한다.",notes = "개인 메시지를 삭제한다.")
    @DeleteMapping("/talk/{talkId}")
    public ResponseEntity<?> deleteTalk(
            @PathVariable("talkId") Long talkId) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        talkService.deleteTalk(talkId);
        message.setStatus(StatusEnum.OK);
        message.setMessage("개인 메시지 삭제 성공");
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }
}
