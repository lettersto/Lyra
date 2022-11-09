package hermes.Lyra.Service;

import hermes.Lyra.domain.Repository.ShortsRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ShortsServiceImpl implements ShortsService {

    private final ShortsRepository shortsRepository;

    private final UserRepository2 userRepository2;

    public ShortsServiceImpl(ShortsRepository shortsRepository, UserRepository2 userRepository2) {
        this.shortsRepository = shortsRepository;
        this.userRepository2 = userRepository2;
    }


}
