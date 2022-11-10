package hermes.Lyra.Service;

import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.domain.Pheed;
import org.springframework.data.domain.Pageable;

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

    List<Pheed> getPheedByUser(String nickname, Pageable pageable);
}
