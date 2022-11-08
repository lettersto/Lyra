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

@Service
@Slf4j
public class TalkServiceImpl implements TalkService {
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;
    private TalkRepository talkRepository;

    @Override
    public Iterable<Talk> myTalk(String refreshToken) {
        System.out.println("hihi");
        boolean result = jwtTokenProvider.validateToken(refreshToken);
        if(!result) {
            throw new IllegalStateException("토큰 만료 되었습니다.");
        }
        User user = userRepository.findByEmail(jwtTokenProvider.getUserPk(refreshToken));
        log.info("user : {}", user);
        Iterable<Talk> talks = talkRepository.findAllByUser(user);
        return talks;
    }
}
