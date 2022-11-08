package hermes.Lyra.controller;

import hermes.Lyra.Service.NoticeService;
import hermes.Lyra.domain.Notice;
import hermes.Lyra.dto.Message;
import hermes.Lyra.dto.NoticeDto;
import hermes.Lyra.dto.StatusEnum;
import hermes.Lyra.dto.UserDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    @ApiOperation(value = "전체 공지를 얻어온다.",notes = "전체 공지를 얻어온다.")
    @GetMapping("")
    public ResponseEntity<?> allNotice() {
        return ResponseEntity.status(200).body(noticeService.findAll());
    }

    // 특정 공지 조회
    @ApiOperation(value = "특정 공지를 얻어온다.",notes = "공지사항에 해당하는 정보를 얻어온다.")
    @GetMapping("/{noticeId}")
    public ResponseEntity<?> selectNotice(@PathVariable("noticeId") Long noticeId) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            Notice notice = noticeService.findById(noticeId);
            message.setStatus(StatusEnum.OK);
            message.setMessage("공지정보 불러오기 성공");
            message.setData(notice);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (NullPointerException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("없는 공지입니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
