package hermes.Lyra.Service;

import hermes.Lyra.domain.User;

import java.util.List;
import java.util.Optional;

public interface FollowService {
    int follow(Long followerId, Long followingId);

    List<User> searchFollowerList(Long userId);

    List<User> searchFollowingList(Long userId);
}
