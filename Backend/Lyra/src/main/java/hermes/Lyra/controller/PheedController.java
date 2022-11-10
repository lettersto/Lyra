package hermes.Lyra.controller;

import hermes.Lyra.Service.PheedService;
import hermes.Lyra.Service.S3UploadService;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.vo.RequestPheed;
import hermes.Lyra.vo.ResponsePheed;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pheed")
@Slf4j
public class PheedController {

    PheedService pheedService;

    S3UploadService s3UploadService;

    public PheedController(S3UploadService s3UploadService, PheedService pheedService) {
        this.s3UploadService = s3UploadService;
        this.pheedService = pheedService;
    }


    @PostMapping("")
    public ResponseEntity<String> createPheed(@RequestParam("user_id") Long userId, @RequestPart RequestPheed pheed, @RequestPart List<MultipartFile> images) throws IOException {

        log.info("Before create pheed data");
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<String> pheedTagList = pheed.getPheedTag();
        log.info(String.valueOf(pheedTagList));

        PheedDto pheedDto = mapper.map(pheed, PheedDto.class);


        pheedDto.setUserId(userId);

        Pheed newPheed = pheedService.createPheed(pheedDto, pheedTagList);

//        ResponsePheed responsePheed = mapper.map(createPheed, ResponsePheed.class);
//        responsePheed.setPheedTag(pheedTagList);

        s3UploadService.upload(images, newPheed);

        log.info("After create pheed data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


//    @GetMapping("all")
//    public ResponseEntity<List<ResponsePheed>> getPheeds() throws Exception {
//
//        log.info("Before get pheeds data");
//        Iterable<Pheed> pheedList = pheedService.getPheedByAll();
//
//        List<ResponsePheed> result = new ArrayList<>();
//
//        pheedList.forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponsePheed.class));
//        });
//
//        log.info("After got pheeds data");
//
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }

    @GetMapping("all")
    public ResponseEntity<List<ResponsePheed>> getPheeds(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get pheeds data");
//        Iterable<Pheed> pheedList = pheedService.getPheedByAll();

        Iterable<Pheed> pheedList = pheedService.getPheedByPage(pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheeds data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @GetMapping("{pheed_id}")
    public ResponseEntity<ResponsePheed> getPheed(@PathVariable("pheed_id") Long pheedId) throws Exception {

        log.info("Before get pheed data");

        Optional<Pheed> pheed = pheedService.getPheedById(pheedId);

        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ResponsePheed responsePheed = mapper.map(pheed.get(), ResponsePheed.class);
        responsePheed.setUserId(pheed.get().getUser().getId());

        log.info("After got pheed data");

        return ResponseEntity.status(HttpStatus.OK).body(responsePheed);
    }


    @PatchMapping("{pheed_id}")
    public ResponseEntity<String> updatePheed(@PathVariable("pheed_id") Long pheedId, @RequestPart RequestPheed pheed, @RequestPart List<MultipartFile> images) throws Exception {

        log.info("Before update pheed data");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<String> pheedTagList = pheed.getPheedTag();
        log.info(String.valueOf(pheedTagList));

        PheedDto pheedDto = mapper.map(pheed, PheedDto.class);

        Pheed newPheed = pheedService.updatePheed(pheedId, pheedDto, pheedTagList);

        s3UploadService.update(images, newPheed, pheedId);

        log.info("After updated pheed data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    @DeleteMapping("{pheed_id}")
    public ResponseEntity<String> deletePheed(@PathVariable("pheed_id") Long pheedId) {

        log.info("Before delete pheed data");

        s3UploadService.delete(pheedId);

        pheedService.deletePheed(pheedId);

        log.info("After deleted pheed data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    @GetMapping("category/{category}")
    public ResponseEntity<List<ResponsePheed>> getPheedByCategory(@PathVariable String category) throws Exception {

        log.info("Before get pheed by category data");
        Iterable<Pheed> pheedList = pheedService.getPheedByCategory(category);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by category data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @GetMapping("search")
    public ResponseEntity<List<ResponsePheed>> getPheedBySearch(@RequestParam(value="keyword") String keyword) {

        log.info("Before get pheed by search data");

        Iterable<Pheed> pheedList = pheedService.getPheedBySearch(keyword);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by search data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @GetMapping("tag")
    public ResponseEntity<?> getPheedbyTag(@RequestParam(value="tag") String tag) throws Exception {

        log.info("Before get pheed by tag data");

        try {

            List<Pheed> pheedList = pheedService.getPheedByTag(tag);

            List<ResponsePheed> result = new ArrayList<>();

            pheedList.forEach(v -> {
                result.add(new ModelMapper().map(v, ResponsePheed.class));
            });


            if(result==null) {
                return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
            }else if(result.size()==0) {
                return new ResponseEntity<String>("조회된 내용이 없습니다.", HttpStatus.NO_CONTENT);
            }else {
                log.info("After got pheed by tag data");
                return ResponseEntity.status(HttpStatus.OK).body(result);
            }

        } catch (Exception e) {
            return new ResponseEntity<String>("조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("")
    public ResponseEntity<List<ResponsePheed>> getPheedbyUser(@RequestParam("user_id") Long userId) throws Exception {

        log.info("Before get pheed by user data");
        Iterable<Pheed> pheedList = pheedService.getPheedByUserId(userId);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by user data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


}
