package hermes.Lyra.Service;

import hermes.Lyra.domain.Repository.*;
import hermes.Lyra.dto.PheedDto;
import hermes.Lyra.domain.Category;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.PheedTag;
import hermes.Lyra.domain.Tag;
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

    private final UserRepository2 userRepository2;

    @Autowired
    public PheedServiceImpl(PheedRepository pheedRepository, TagRepository tagRepository, PheedTagRepository pheedTagRepository, CommentRepository commentRepository, UserRepository2 userRepository2) {
        this.pheedRepository = pheedRepository;
        this.tagRepository = tagRepository;
        this.pheedTagRepository = pheedTagRepository;
        this.commentRepository = commentRepository;
        this.userRepository2 = userRepository2;
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
    public Pheed createPheed(PheedDto pheedDto, List<String> pheedTagList) {
//        if (multipartFile != null) {
//            String imgUrl = s3Service.uploadObject(multipartFile);
//            pheedDto.setImgUrl(imgUrl);
//        }


        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Pheed pheed = mapper.map(pheedDto, Pheed.class);

        log.info(String.valueOf(pheed));

        pheed.setUser(userRepository2.findById(pheedDto.getUserId()).get());

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

        return pheed;
    }

    @Override
    public Iterable<Pheed> getPheedByUserId(Long userId) {
        return pheedRepository.findByUserId(userId);
    }

    @Override
    public List<Pheed> getPheedByTag(String tag) {
        Long ti = tagRepository.findByName(tag).getId();
        Iterable<PheedTag> pt = pheedTagRepository.findByTagId(ti);

//        log.info(String.valueOf(pt));

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
    public Pheed updatePheed(Long pheedId, PheedDto pheedDto, List<String> pheedTagList) {

        Optional<Pheed> p = pheedRepository.findById(pheedId);
        pheedDto.setUserId(p.get().getUser().getId());


        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Pheed pheed = mapper.map(pheedDto, Pheed.class);

        pheed.setId(pheedId);
        pheed.setTime(p.get().getTime());
//        log.info(String.valueOf(pheed));
        pheed.setUser(p.get().getUser());

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

//        PheedDto returnValue = mapper.map(pheed, PheedDto.class);
        return pheed;
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
