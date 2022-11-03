package hermes.Lyra.Service;


import hermes.Lyra.domain.Repository.SupportRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Support;
import hermes.Lyra.dto.SupportDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class SupportServiceImpl implements SupportService{

    private final SupportRepository supportRepository;

    private final UserRepository2 userRepository2;

    @Autowired
    public SupportServiceImpl(SupportRepository supportRepository, UserRepository2 userRepository2) {
        this.supportRepository = supportRepository;
        this.userRepository2 = userRepository2;
    }


    @Override
    public SupportDto createSupport(SupportDto supportDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Support support = mapper.map(supportDto, Support.class);

        support.setSupporter(userRepository2.findById(supportDto.getSupporterId()).get());

        support.setBusker(userRepository2.findById(supportDto.getBuskerId()).get());

        supportRepository.save(support);

        SupportDto returnValue = mapper.map(support, SupportDto.class);

        return returnValue;
    }

    @Override
    public Iterable<Support> getSupportBySupporterId(Long userId) {
        return supportRepository.findBySupporterId(userId);
    }

    @Override
    public Iterable<Support> getSupportByBuskerId(Long userId) {
        return supportRepository.findByBuskerId(userId);
    }
}
