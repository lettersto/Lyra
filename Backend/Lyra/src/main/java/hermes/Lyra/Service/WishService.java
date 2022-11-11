package hermes.Lyra.Service;

import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;

import java.util.List;

public interface WishService {
    int wishPheed(Long userId, Long pheedId);

    List<Pheed> searchPheedList(Long userId);

    List<User> searchUserList(Long pheedId);
}
