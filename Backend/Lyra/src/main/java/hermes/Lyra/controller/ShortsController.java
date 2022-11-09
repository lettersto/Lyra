package hermes.Lyra.controller;

import hermes.Lyra.Service.S3UploadService;
import hermes.Lyra.Service.ShortsService;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.vo.RequestPheed;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/shorts")
@Slf4j
public class ShortsController {

    ShortsService shortsService;

    S3UploadService s3UploadService;

    @PostMapping("")
    public ResponseEntity<String> createShorts(@RequestParam("user_id") Long userId, @RequestPart MultipartFile video) throws IOException {

        log.info("Before create shorts data");

        s3UploadService.uploadShorts(video, userId);

        log.info("After create shorts data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}
