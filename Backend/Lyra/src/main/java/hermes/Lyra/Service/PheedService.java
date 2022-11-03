package hermes.Lyra.Service;

import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.domain.Pheed;

import java.util.List;
import java.util.Optional;


public interface PheedService {

    Iterable<Pheed> getPheedByCategory(String category);

    Iterable<Pheed> getPheedByAll();

    Iterable<Pheed> getPheedBySearch(String keyword);

    PheedDto createPheed(PheedDto pheedDto, List<String> pheedTagList);

    Iterable<Pheed> getPheedByUserId(Long userId);

    List<Pheed> getPheedByTag(String tag);

    PheedDto updatePheed(Long pheedId, PheedDto pheedDto, List<String> pheedTagList);

    void deletePheed(Long pheedId);

    Optional<Pheed> getPheedById(Long pheedId);

}
