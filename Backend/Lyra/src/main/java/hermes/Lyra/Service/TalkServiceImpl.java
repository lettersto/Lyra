package hermes.Lyra.Service;

import hermes.Lyra.config.JwtTokenProvider;
import hermes.Lyra.domain.Notice;
import hermes.Lyra.domain.Repository.TalkRepository;
import hermes.Lyra.domain.Repository.UserRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Talk;
import hermes.Lyra.domain.User;
import hermes.Lyra.dto.RequestDto.NoticeRequestDto;
import hermes.Lyra.dto.RequestDto.TalkRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TalkServiceImpl implements TalkService {

    @Autowired
    UserRepository2 userRepository;
    private final TalkRepository talkRepository;

    public TalkServiceImpl(TalkRepository talkRepository) {
        this.talkRepository = talkRepository;
    }

    @Override
    public List<Talk> myTalk(Long userId) {
        return talkRepository.findAllByUserId(userId);
    }

    @Override
    public Talk createTalk(Long userId, TalkRequestDto talkRequestDto) {
        Talk talk = new Talk();
        talk.setContent(talkRequestDto.getContent());
        talk.setIsRead(false);
        User user = userRepository.findById(userId).orElse(null);
        talk.setUser(user);
        talkRepository.save(talk);
        return talk;
    }

    @Override
    public int updateTalk(Long talkId, TalkRequestDto talkRequestDto) {
        Talk talk = talkRepository.findById(talkId).orElse(null);
        if (talk == null) return 3;
        talk.setContent(talkRequestDto.getContent());
        talk.setIsRead(false);
        talkRepository.save(talk);
        return 1;
    }

    @Override
    public void deleteTalk(Long talkId) {
        Talk talk = talkRepository.findById(talkId).orElse(null);
        if (talk==null) {
            return;
        }
        talkRepository.delete(talk);
        return;
    }

    @Override
    public void read(Long talkId) {
        Talk talk = talkRepository.findById(talkId).orElse(null);
        if (talk==null) {
            return;
        }
        talk.setIsRead(true);
        talkRepository.save(talk);
        return;
    }
}
