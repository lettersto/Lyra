package hermes.businessservice.controller;

import hermes.businessservice.dto.PheedDto;
import hermes.businessservice.entity.Pheed;
import hermes.businessservice.service.PheedService;
import hermes.businessservice.vo.ResponsePheed;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    //    @ApiOperation(value = "카테고리 별 피드 확인", response = String.class)
    @GetMapping("/category/{category}")
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

}
