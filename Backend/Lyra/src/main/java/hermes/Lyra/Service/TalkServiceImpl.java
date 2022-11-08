package hermes.Lyra.Service;

import hermes.Lyra.config.JwtTokenProvider;
import hermes.Lyra.domain.Repository.TalkRepository;
import hermes.Lyra.domain.Repository.UserRepository;
import hermes.Lyra.domain.Talk;
import hermes.Lyra.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TalkServiceImpl implements TalkService {
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;
    private TalkRepository talkRepository;

    @Override
    public List<Talk> myTalk(Long userId) {
        System.out.println("mouoawieuoqwiurioqwueoiwqurouqwioeu");
        return talkRepository.findAllByUserId(userId);
    }
}
