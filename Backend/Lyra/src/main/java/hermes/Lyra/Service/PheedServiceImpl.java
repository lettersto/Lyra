package hermes.Lyra.Service;

import hermes.Lyra.domain.*;
import hermes.Lyra.domain.Repository.*;
import hermes.Lyra.dto.PheedDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
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
    public List<Pheed> getPheedByCategory(String category, Pageable pageable) {
        Category categoryByEnum = Category.valueOf(category);
        return pheedRepository.findByCategory(categoryByEnum, pageable);
    }

    @Override
    public Iterable<Pheed> getPheedByAll() {
        return pheedRepository.findAll();
    }

    @Override
    public List<Pheed> getPheedBySearch(String keyword, Pageable pageable) {
        return pheedRepository.findBySearch(keyword, pageable);
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
    public List<Pheed> getPheedByNickname(String nickname, Pageable pageable) {
        Optional<User> user = userRepository2.findByNickname(nickname);
        Long userId = user.get().getId();
        return pheedRepository.findByUserId(userId, pageable);
    }

    @Override
    public List<Pheed> getPheedByTag(String tag, Pageable pageable) {
        Tag t = tagRepository.findByName(tag);
        List<Pheed> result = new ArrayList<>();
        if (t != null) {

            Long ti = t.getId();
            List<PheedTag> pt = pheedTagRepository.findByTagId(ti, pageable);

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

    @Override
    @Transactional
    public Iterable<Pheed> getPheedByPage(Pageable pageable) {
        return pheedRepository.findAll(pageable);
    }

    @Override
    public List<Pheed> getPheedByRegion(String regionCode, Pageable pageable) {
        return pheedRepository.findByRegionCode(regionCode, pageable);
    }

    @Override
    public List<Pheed> getPheedByUserPlan(Long userId) {

        Timestamp stmStamp = Timestamp.valueOf(LocalDateTime.now());
        Timestamp etmStamp = Timestamp.valueOf(LocalDateTime.now());

        Calendar cal = Calendar.getInstance();
        cal.setTime(stmStamp);
        cal.add(Calendar.HOUR, -168);
        stmStamp.setTime(cal.getTime().getTime());
//        System.out.println(stmStamp);

        cal.setTime(etmStamp);
        cal.add(Calendar.HOUR, 168);
        etmStamp.setTime(cal.getTime().getTime());
//        System.out.println(etmStamp);
        return pheedRepository.findByStartTimeBetweenAndState(stmStamp, etmStamp, 0);
    }

    @Override
    public List<Pheed> getPheedByUserChat(Long userId) {
        return pheedRepository.findByUserIdAndState(userId, 1);
    }

    @Override
    public boolean updatePheedByState(Long pheedId, int state) {
        log.info("hello");
        Optional<Pheed> p = pheedRepository.findById(pheedId);
        log.info("hello1");
        User user = p.get().getUser();
        log.info(String.valueOf(user));
        Long cp = pheedRepository.countByUserAndState(user, 1);
        if (cp > 0) {
            return false;
        }
        p.get().setState(state);
        pheedRepository.save(p.get());
        return true;
    }

    @Override
    public List<Pheed> getPheedByMap(BigDecimal latitude, BigDecimal longitude, double z) {
        List<Pheed> pheedList = pheedRepository.findByState(1);

        List<Pheed> result = new ArrayList<>();
        double lat = latitude.doubleValue();
        double lon = longitude.doubleValue();

        for (Pheed p : pheedList) {
            double newLat = p.getLatitude().doubleValue();
            double newLon = p.getLongitude().doubleValue();
            double theta = Math.abs(lon - newLon);

            double dist = Math.sin(Math.toRadians(lat)) * Math.sin(Math.toRadians(newLat)) + Math.cos(Math.toRadians(lat)) * Math.cos(Math.toRadians(newLat)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist*60*1.1515;
            dist = dist*1.609344;

            if (z >= dist) {
                result.add(p);
            }
        }
        log.info(String.valueOf(result.size()));

        return result;
    }

    @Override
    public List<Pheed> getPheedByUser(Long userId, Pageable pageable) {
        return pheedRepository.findByUserId(userId, pageable);
    }
}
