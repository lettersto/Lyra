package hermes.Lyra.controller;

import hermes.Lyra.Service.PheedService;
import hermes.Lyra.Service.S3UploadService;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.vo.RequestPheed;
import hermes.Lyra.vo.ResponsePheed;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
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


    @ApiOperation(value = "피드 작성")
    @PostMapping("")
    public ResponseEntity<String> createPheed(@RequestParam("user_id") Long userId, @ModelAttribute RequestPheed pheed, @RequestPart List<MultipartFile> images) throws IOException {

        log.info("Before create pheed data");
        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

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


    @ApiOperation(value = "모든 피드 불러오기")
    @GetMapping("all")
    public ResponseEntity<List<ResponsePheed>> getPheeds() throws Exception {

        log.info("Before get pheeds data");
        Iterable<Pheed> pheedList = pheedService.getPheedByAll();

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheeds data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "모든 피드 불러오기, 페이징0부터&최신순")
    @GetMapping("")
    public ResponseEntity<List<ResponsePheed>> getPheedsByPage(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

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

    @ApiOperation(value = "동네 별 모든 피드 불러오기, 페이징0부터&최신순")
    @GetMapping("region")
    public ResponseEntity<List<ResponsePheed>> getPheedsByRegion(@RequestParam(value="code") String code, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get pheeds data");

        List<Pheed> pheedList = pheedService.getPheedByRegion(code, pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheeds data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "배너에 사용 될 우리 동네 피드중에 좋아요 높은 순, state=1인 것 중에")
    @GetMapping("banner")
    public ResponseEntity<List<ResponsePheed>> getPheedsByBanner(@RequestParam(value="code") String code) throws Exception {

        log.info("Before get pheeds data");

        List<Pheed> pheedList = pheedService.getPheedByBanner(code);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheeds data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @ApiOperation(value = "피드 상세 불러오기")
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


    @ApiOperation(value = "피드 수정")
    @PatchMapping("{pheed_id}")
    public ResponseEntity<String> updatePheed(@PathVariable("pheed_id") Long pheedId, @ModelAttribute RequestPheed pheed, @RequestPart List<MultipartFile> images) throws Exception {

        log.info("Before update pheed data");

        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<String> pheedTagList = pheed.getPheedTag();
        log.info(String.valueOf(pheedTagList));

        PheedDto pheedDto = mapper.map(pheed, PheedDto.class);

        Pheed newPheed = pheedService.updatePheed(pheedId, pheedDto, pheedTagList);

        s3UploadService.update(images, newPheed, pheedId);

        log.info("After updated pheed data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    @ApiOperation(value = "피드 삭제")
    @DeleteMapping("{pheed_id}")
    public ResponseEntity<String> deletePheed(@PathVariable("pheed_id") Long pheedId) {

        log.info("Before delete pheed data");

        s3UploadService.delete(pheedId);

        pheedService.deletePheed(pheedId);

        log.info("After deleted pheed data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    @ApiOperation(value = "카테고리 별 피드, 페이징0부터&최신순")
    @GetMapping("category/{category}")
    public ResponseEntity<List<ResponsePheed>> getPheedByCategory(@PathVariable String category, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get pheed by category data");
        List<Pheed> pheedList = pheedService.getPheedByCategory(category, pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by category data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @ApiOperation(value = "키워드로 피드 검색, 페이징0부터&최신순")
    @GetMapping("search")
    public ResponseEntity<List<ResponsePheed>> getPheedBySearch(@RequestParam(value="keyword") String keyword, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        log.info("Before get pheed by search data");

        List<Pheed> pheedList = pheedService.getPheedBySearch(keyword, pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by search data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @ApiOperation(value = "태그로 피드 검색, 페이징0부터&최신순")
    @GetMapping("tag")
    public ResponseEntity<List<ResponsePheed>> getPheedbyTag(@RequestParam(value="tag") String tag, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get pheed by tag data");

        List<Pheed> pheedList = pheedService.getPheedByTag(tag, pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by tag data");
        return ResponseEntity.status(HttpStatus.OK).body(result);


    }


    @ApiOperation(value = "유저 닉네임으로 피드 검색, 페이징0부터&최신순")
    @GetMapping("nickname")
    public ResponseEntity<List<ResponsePheed>> getPheedbyNickname(@RequestParam String nickname, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get pheed by user data");
        List<Pheed> pheedList = pheedService.getPheedByNickname(nickname, pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by user data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "유저 아이디로 피드 조회, state 상관없이, 페이징0부터&최신순")
    @GetMapping("mybusking")
    public ResponseEntity<List<ResponsePheed>> getPheedbyUser(@RequestParam("user_id") Long userId, @PageableDefault(size = 30, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        log.info("Before get pheed by user data");
        List<Pheed> pheedList = pheedService.getPheedByUser(userId, pageable);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by user data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

//    @ApiOperation(value = "유저 아이디로 피드 조회 -7일 +7일 이내 state=0인것만")
//    @GetMapping("userplan")
//    public ResponseEntity<List<ResponsePheed>> getPheedbyUserPlan(@RequestParam("user_id") Long userId) throws Exception {
//
//        log.info("Before get pheed by user data");
//        List<Pheed> pheedList = pheedService.getPheedByUserPlan(userId);
//
//        List<ResponsePheed> result = new ArrayList<>();
//
//        pheedList.forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponsePheed.class));
//        });
//
//        log.info("After got pheed by user data");
//
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }

    @ApiOperation(value = "유저 아이디로 피드 조회 state=0인것만")
    @GetMapping("userplan")
    public ResponseEntity<List<ResponsePheed>> getPheedbyUserPlan(@RequestParam("user_id") Long userId) throws Exception {

        log.info("Before get pheed by user data");
        List<Pheed> pheedList = pheedService.getPheedByUserPlan(userId);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by user data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "유저 아이디로 피드 조회 state=1인것")
    @GetMapping("userchat")
    public ResponseEntity<List<ResponsePheed>> getPheedbyUserChat(@RequestParam("user_id") Long userId) throws Exception {

        log.info("Before get pheed by user data");
        List<Pheed> pheedList = pheedService.getPheedByUserChat(userId);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by user data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "피드 상태 변경 0 or 1 or 2")
    @PatchMapping("pheedstate")
    public ResponseEntity<String> updatePheedbyState(@RequestParam("pheed_id") Long pheedId, @RequestParam("state") int state) throws Exception {

        log.info("Before update pheed data");

        Boolean b = pheedService.updatePheedByState(pheedId, state);

        if (b == true) {

            log.info("After updated pheed data");

            return new ResponseEntity<String>("success", HttpStatus.OK);

        }

        return new ResponseEntity<String>("fail: You have a feed with an open chat", HttpStatus.OK);

    }

    @ApiOperation(value = "지도에서 쓸 피드 정보")
    @GetMapping("map")
    public ResponseEntity<List<ResponsePheed>> getPheedbyMap(@RequestParam("latitude") BigDecimal latitude, @RequestParam("longitude") BigDecimal longitude, @RequestParam("zoom") double zoom) throws Exception {

        log.info("Before get pheed by map");

        zoom = 20 - zoom;

        double z = 23 * Math.pow(2, zoom);

//        log.info(String.valueOf(z));

        List<Pheed> pheedList = pheedService.getPheedByMap(latitude, longitude, z);

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed by map");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


}
