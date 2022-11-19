package hermes.Lyra.Service;

import hermes.Lyra.domain.User;
import hermes.Lyra.vo.ResponseFollower;
import hermes.Lyra.vo.ResponseFollowing;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface FollowService {
    int follow(Long followerId, Long followingId);

//    List<User> searchFollowerList(Long userId);
//
//    List<User> searchFollowingList(Long userId);

    List<ResponseFollowing> searchFollowerList(Long userId, Pageable pageable);

    List<ResponseFollower> searchFollowingList(Long userId, Pageable pageable);

    int check(Long followerId, Long followingId);
}
