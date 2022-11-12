package hermes.Lyra.Service;

import hermes.Lyra.domain.Repository.ShortsRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Shorts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;

@Service
@Slf4j
public class ShortsServiceImpl implements ShortsService {

    private final ShortsRepository shortsRepository;

    private final UserRepository2 userRepository2;

    public ShortsServiceImpl(ShortsRepository shortsRepository, UserRepository2 userRepository2) {
        this.shortsRepository = shortsRepository;
        this.userRepository2 = userRepository2;
    }
    @Override
    public Iterable<Shorts> getShorts() {
        return shortsRepository.findAll();
    }

    @Override
    public List<Shorts> getShortsByRegion(String regionCode) {
        Timestamp stmStamp = Timestamp.valueOf(LocalDateTime.now());
        Timestamp etmStamp = Timestamp.valueOf(LocalDateTime.now());

        Calendar cal = Calendar.getInstance();
        cal.setTime(stmStamp);
        cal.add(Calendar.HOUR, -12);
        stmStamp.setTime(cal.getTime().getTime());

        return shortsRepository.findByTimeBetweenAndRegionCode(stmStamp, etmStamp, regionCode);
    }
}
