package hermes.businessservice.service;

import hermes.businessservice.dto.PheedDto;
import hermes.businessservice.entity.Category;
import hermes.businessservice.entity.Pheed;
import hermes.businessservice.entity.PheedTag;
import hermes.businessservice.entity.Tag;
import hermes.businessservice.repository.CommentRepository;
import hermes.businessservice.repository.PheedRepository;
import hermes.businessservice.repository.PheedTagRepository;
import hermes.businessservice.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class PheedServiceImpl implements PheedService{

//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;

//    private final AmazonS3 amazonS3;

    private final PheedRepository pheedRepository;

    private final TagRepository tagRepository;

    private final PheedTagRepository pheedTagRepository;

    private final CommentRepository commentRepository;

    @Autowired
    public PheedServiceImpl(PheedRepository pheedRepository, TagRepository tagRepository, PheedTagRepository pheedTagRepository, CommentRepository commentRepository) {
        this.pheedRepository = pheedRepository;
        this.tagRepository = tagRepository;
        this.pheedTagRepository = pheedTagRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Iterable<Pheed> getPheedByCategory(String category) {
        Category categoryByEnum = Category.valueOf(category);
        return pheedRepository.findByCategory(categoryByEnum);
    }

    @Override
    public Iterable<Pheed> getPheedByAll() {
        return pheedRepository.findAll();
    }

    @Override
    public Iterable<Pheed> getPheedBySearch(String keyword) {
        return pheedRepository.findBySearch(keyword);
    }

    @Override
    public PheedDto createPheed(PheedDto pheedDto, List<String> pheedTagList) {
//        if (multipartFile != null) {
//            String imgUrl = s3Service.uploadObject(multipartFile);
//            pheedDto.setImgUrl(imgUrl);
//        }


        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Pheed pheed = mapper.map(pheedDto, Pheed.class);

        log.info(String.valueOf(pheed));

        Long pheedId = pheedRepository.save(pheed).getId();

        if(pheedTagList != null) {
            for (String tag : pheedTagList) {
                Tag t = tagRepository.findByName(tag);
                if (t == null) {
                    t = new Tag();
                    t.setName(tag);
                    t = tagRepository.getOne(tagRepository.save(t).getId());
                }

                PheedTag pt = new PheedTag();
                pt.setPheed(pheedRepository.getOne(pheedId));
                pt.setTag(t);
                pt.setName(tag);
                pheedTagRepository.save(pt);
            }
        }

        PheedDto returnValue = mapper.map(pheed, PheedDto.class);

        return returnValue;
    }

    @Override
    public Iterable<Pheed> getPheedByUserId(Long userId) {
        return pheedRepository.findByUserId(userId);
    }

    @Override
    public List<Pheed> getPheedByTag(String tag) {
        Long ti = tagRepository.findByName(tag).getId();
        Iterable<PheedTag> pt = pheedTagRepository.findByTagId(ti);

        List<Pheed> result = new ArrayList<>();

        if(pt == null){
            return null;
        }else{
            pt.forEach(v -> {
                result.add(v.getPheed());
            });
        }
        return result;
    }

    @Override
    public PheedDto updatePheed(Long pheedId, PheedDto pheedDto, List<String> pheedTagList) {

        Optional<Pheed> p = pheedRepository.findById(pheedId);
        pheedDto.setUserId(p.get().getUserId());


        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Pheed pheed = mapper.map(pheedDto, Pheed.class);

        pheed.setId(pheedId);
        pheed.setTime(p.get().getTime());
        log.info(String.valueOf(pheed));

        pheedRepository.save(pheed);


        for(PheedTag pheedTag :pheedTagRepository.findByPheedId(pheedId)){
            pheedTagRepository.delete(pheedTag);
        }


        if(pheedTagList != null) {
            for (String tag : pheedTagList) {
                Tag t = tagRepository.findByName(tag);
                if (t == null) {
                    t = new Tag();
                    t.setName(tag);
                    t = tagRepository.getOne(tagRepository.save(t).getId());
                }

                PheedTag pt = new PheedTag();
                pt.setPheed(pheedRepository.getOne(pheedId));
                pt.setTag(t);
                pt.setName(tag);
                pheedTagRepository.save(pt);
            }
        }

        PheedDto returnValue = mapper.map(pheed, PheedDto.class);
        return returnValue;
    }

    @Override
    public void deletePheed(Long pheedId) {


        for(PheedTag pheedTag :pheedTagRepository.findByPheedId(pheedId)){
            pheedTagRepository.delete(pheedTag);
        }
        commentRepository.deleteByPheedId(pheedId);
        pheedRepository.deleteById(pheedId);
    }

    @Override
    public Optional<Pheed> getPheedById(Long pheedId) {
        return pheedRepository.findById(pheedId);
    }


}
