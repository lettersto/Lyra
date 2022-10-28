package hermes.businessservice.controller;

import hermes.businessservice.dto.PheedDto;
import hermes.businessservice.entity.Pheed;
import hermes.businessservice.entity.PheedTag;
import hermes.businessservice.service.PheedService;
import hermes.businessservice.vo.RequestPheed;
import hermes.businessservice.vo.ResponsePheed;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/business-service")
@Slf4j
public class PheedController {

    PheedService pheedService;


    public PheedController(PheedService pheedService) {
        this.pheedService = pheedService;
    }

    //    @ApiOperation(value = "피드 등록", response = String.class)
    @PostMapping("/{user_id}/pheed")
    public ResponseEntity<String> createPheed(@PathVariable("user_id") Long userId, @RequestBody RequestPheed pheed) {

        log.info("Before create pheed data");
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<String> pheedTagList = pheed.getPheedTag();
        log.info(String.valueOf(pheedTagList));

        PheedDto pheedDto = mapper.map(pheed, PheedDto.class);


        pheedDto.setUserId(userId);

        PheedDto createPheed = pheedService.createPheed(pheedDto, pheedTagList);

//        ResponsePheed responsePheed = mapper.map(createPheed, ResponsePheed.class);
//        responsePheed.setPheedTag(pheedTagList);

        log.info("After create pheed data");

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    //    @ApiOperation(value = "전체 피드 확인", response = String.class)
    @GetMapping("/pheed")
    public ResponseEntity<List<ResponsePheed>> getPheed() throws Exception {

        log.info("Before get pheed data");
        Iterable<Pheed> pheedList = pheedService.getPheedByAll();

        List<ResponsePheed> result = new ArrayList<>();

        pheedList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponsePheed.class));
        });

        log.info("After got pheed data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //    @ApiOperation(value = "카테고리 별 피드 확인", response = String.class)
    @GetMapping("/pheed/{category}")
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

//    @ApiOperation(value = "제목, 내용으로 피드 검색", response = String.class)
    @GetMapping("/pheed/search")
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

    //    @ApiOperation(value = "태그로 피드 검색", response = String.class)
    @GetMapping("/pheed/tag")
    public ResponseEntity<?> getPheedbyTag(@RequestParam String tag) throws Exception {

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

    //    @ApiOperation(value = "작성자별 피드 검색", response = String.class)
    @GetMapping("/{user_id}/pheed")
    public ResponseEntity<List<ResponsePheed>> getPheedbyUser(@PathVariable("user_id") Long userId) throws Exception {

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
