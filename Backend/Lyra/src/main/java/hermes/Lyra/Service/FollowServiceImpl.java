package hermes.Lyra.Service;

import hermes.Lyra.domain.Follow;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Repository.FollowRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Repository.WishRepository;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FollowServiceImpl implements FollowService {

    @Autowired
    UserRepository2 userRepository;

    @Autowired
    FollowRepository followRepository;

    @Override
    public int follow(Long followerId, Long followingId) {
        Follow follow = new Follow();
        // 팔로워 == 주체
        User follower = userRepository.findById(followerId).orElse(null);
        if (follower==null) return 3;

        // 팔로잉 == 상대방
        User following = userRepository.findById(followingId).orElse(null);
        if (following==null) return 4;

        // 있는지 확인
        Follow check = followRepository.findByFollowerIdAndFollowingId(follower, following).orElse(null);
        if (check==null) {
            follow.setFollowerId(follower);
            follow.setFollowingId(following);
            followRepository.save(follow);
            return 1;
        }
        else {
            followRepository.delete(check);
            return 2;
        }
    }

    @Override
    public List<User> searchFollowerList(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<Follow> followerList = followRepository.findAllByFollowerId(user).orElseGet(null);
//      팔로워만 뽑아내기 위한 초기화
        List<User> followers = new ArrayList<>();

        for (int i=0; i<followerList.size(); i++) {
            User follower = followerList.get(i).getFollowingId();
            followers.add(follower);
        }
        return followers;
    }

    @Override
    public List<User> searchFollowingList(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<Follow> followingList = followRepository.findAllByFollowingId(user).orElseGet(null);
//      팔로워만 뽑아내기 위한 초기화
        List<User> followings = new ArrayList<>();

        for (int i=0; i<followingList.size(); i++) {
            User follower = followingList.get(i).getFollowerId();
            followings.add(follower);
        }
        return followings;
    }
}
