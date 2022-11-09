package hermes.Lyra.Service;

import hermes.Lyra.config.JwtTokenProvider;
import hermes.Lyra.domain.Repository.TalkRepository;
import hermes.Lyra.domain.Repository.UserRepository;
import hermes.Lyra.domain.Talk;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TalkServiceImpl implements TalkService {
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;
    private final TalkRepository talkRepository;

    public TalkServiceImpl(TalkRepository talkRepository) {
        this.talkRepository = talkRepository;
    }

    @Override
    public List<Talk> myTalk(Long userId) {
        return talkRepository.findAllByUserId(userId);
    }
}
