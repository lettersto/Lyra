package hermes.Lyra.Service;

import hermes.Lyra.domain.Support;
import hermes.Lyra.domain.Talk;

import java.util.List;

public interface TalkService {
    List<Talk> myTalk(Long userId);
}
