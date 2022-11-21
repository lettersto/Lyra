package hermes.Lyra.Service;

import hermes.Lyra.domain.Support;
import hermes.Lyra.domain.Talk;
import hermes.Lyra.dto.RequestDto.TalkRequestDto;

import java.util.List;

public interface TalkService {
    List<Talk> myTalk(Long userId);

    Talk createTalk(Long userId, TalkRequestDto talkRequestDto);

    void deleteTalk(Long talkId);

    int updateTalk(Long talkId, TalkRequestDto talkRequestDto);

    void read(Long talkId);
}
