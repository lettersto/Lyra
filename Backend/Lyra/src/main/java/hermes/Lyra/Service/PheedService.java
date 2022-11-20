package hermes.Lyra.Service;

import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.domain.Pheed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


public interface PheedService {

//    Iterable<Pheed> getPheedByCategory(String category);

    List<Pheed> getPheedByCategory(String category, Pageable pageable);

    Iterable<Pheed> getPheedByAll();

//    Iterable<Pheed> getPheedBySearch(String keyword);

    List<Pheed> getPheedBySearch(String keyword, Pageable pageable);

    Pheed createPheed(PheedDto pheedDto, List<String> pheedTagList);

//    Iterable<Pheed> getPheedByUserId(Long userId);

//    List<Pheed> getPheedByUserId(Long userId, Pageable pageable);

//    List<Pheed> getPheedByTag(String tag);

    List<Pheed> getPheedByTag(String tag, Pageable pageable);

    Pheed updatePheed(Long pheedId, PheedDto pheedDto, List<String> pheedTagList);

    void deletePheed(Long pheedId);

    Optional<Pheed> getPheedById(Long pheedId);

    Iterable<Pheed> getPheedByPage(Pageable pageable);

    List<Pheed> getPheedByNickname(String nickname, Pageable pageable);

    List<Pheed> getPheedByRegion(String regionCode, Pageable pageable);

    List<Pheed> getPheedByUserPlan(Long userId);

    List<Pheed> getPheedByUserChat(Long userId);

    boolean updatePheedByState(Long pheedId, int state);

    List<Pheed> getPheedByMap(BigDecimal latitude, BigDecimal longitude, double z);

    List<Pheed> getPheedByUser(Long userId, Pageable pageable);

    List<Pheed> getPheedByBanner(String code, Pageable pageable);
}
