package hermes.Lyra.Service;


import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.SupportRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Support;
import hermes.Lyra.dto.SupportDto;
import hermes.Lyra.vo.RequestSupport2;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class SupportServiceImpl implements SupportService{

    private final SupportRepository supportRepository;

    private final UserRepository2 userRepository2;

    private final PheedRepository pheedRepository;

    @Autowired
    public SupportServiceImpl(SupportRepository supportRepository, UserRepository2 userRepository2, PheedRepository pheedRepository) {
        this.supportRepository = supportRepository;
        this.userRepository2 = userRepository2;
        this.pheedRepository = pheedRepository;
    }


    @Override
    public SupportDto createSupport(SupportDto supportDto, Long pheedId) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Support support = mapper.map(supportDto, Support.class);

        Optional<Pheed> pheed = pheedRepository.findById(pheedId);

        support.setSupporter(userRepository2.findById(supportDto.getSupporterId()).get());

        support.setBusker(pheed.get().getUser());

        support.setPheed(pheed.get());

        supportRepository.save(support);

        SupportDto returnValue = mapper.map(support, SupportDto.class);

        return returnValue;
    }

//    @Override
//    public Iterable<Support> getSupportBySupporterId(Long userId) {
//        return supportRepository.findBySupporterId(userId);
//    }
//
//    @Override
//    public Iterable<Support> getSupportByBuskerId(Long userId) {
//        return supportRepository.findByBuskerId(userId);
//    }

    @Override
    public List<Support> getSupportBySupporterId(Long userId, Timestamp startTime, Timestamp endTime, Pageable pageable) {
        String time = String.valueOf(startTime);

        if (time != "1111-11-11 11:11:11") {
            return supportRepository.findByTimeBetweenAndSupporterId(startTime, endTime, userId, pageable);
        }
        return supportRepository.findBySupporterId(userId, pageable);
    }

    @Override
    public List<Support> getSupportByBuskerId(Long userId, Timestamp startTime, Timestamp endTime, Pageable pageable) {
        String time = String.valueOf(startTime);

        if (time != "1111-11-11 11:11:11") {
            return supportRepository.findByTimeBetweenAndBuskerId(startTime, endTime, userId, pageable);
        }
        return supportRepository.findByBuskerId(userId, pageable);
    }

    @Override
    public Iterable<Support> getSupportsByChat(Long pheedId) {
        Optional<Pheed> pheed = pheedRepository.findById(pheedId);
        return supportRepository.findByBuskerIdAndPheedId(pheed.get().getUser().getId(), pheedId);
    }

    @Override
    public int getTotalCoin(Long pheedId) {
        final int[] totalCoin = {0};
        Iterable<Support> support = supportRepository.findByPheedId(pheedId);

        support.forEach(v -> {
            totalCoin[0] += v.getCoin();
        });

        return totalCoin[0];
    }
}
