package hermes.Lyra.Service;

import hermes.Lyra.domain.Support;
import hermes.Lyra.domain.Talk;

public interface TalkService {
    Iterable<Talk> myTalk(String refreshToken);
}
