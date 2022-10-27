package hermes.businessservice.service;

import hermes.businessservice.dto.PheedDto;
import hermes.businessservice.entity.Pheed;

import java.util.List;


public interface PheedService {

    Iterable<Pheed> getPheedByCategory(String category);

    Iterable<Pheed> getPheedByAll();

    Iterable<Pheed> getPheedBySearch(String keyword);

    PheedDto createPheed(PheedDto pheedDto, List<String> pheedTagList);

    Iterable<Pheed> getPheedByUserId(Long userId);

    Iterable<Pheed> getPheedByPheedTag(String tag);
}
