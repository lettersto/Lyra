package hermes.Lyra.controller;

import hermes.Lyra.Service.S3UploadService;
import hermes.Lyra.Service.ShortsService;
import hermes.Lyra.domain.Shorts;
import hermes.Lyra.vo.ResponseShorts;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/shorts")
@Slf4j
public class ShortsController {


    S3UploadService s3UploadService;

    ShortsService shortsService;

    public ShortsController(S3UploadService s3UploadService, ShortsService shortsService) {
        this.s3UploadService = s3UploadService;
        this.shortsService = shortsService;
    }

    @ApiOperation(value = "쇼츠 작성")
    @PostMapping("")
    public ResponseEntity<String> createShorts(@RequestParam("user_id") Long userId, @RequestPart MultipartFile video) throws IOException {

        log.info("Before create shorts data");

        s3UploadService.uploadShorts(userId, video);

        log.info("After create shorts data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "쇼츠 삭제")
    @DeleteMapping("{shorts_id}")
    public ResponseEntity<String> deleteShorts(@PathVariable("shorts_id") Long shortsId) throws IOException {

        log.info("Before delete shorts data");

        s3UploadService.deleteShorts(shortsId);

        log.info("After delete shorts data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "전체 쇼츠 불러오기")
    @GetMapping("/all")
    public ResponseEntity<List<ResponseShorts>> getShorts() throws IOException {
        log.info("Before get shorts data");

        Iterable<Shorts> shortsList = shortsService.getShorts();

        List<ResponseShorts> result = new ArrayList<>();

        shortsList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseShorts.class));
        });

        log.info("After got shorts data");

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }
}
