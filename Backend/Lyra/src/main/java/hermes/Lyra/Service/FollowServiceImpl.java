package hermes.Lyra.Service;

import hermes.Lyra.domain.Follow;
import hermes.Lyra.domain.Repository.FollowRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.User;
import hermes.Lyra.vo.ResponseFollower;
import hermes.Lyra.vo.ResponseFollowing;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
            // you.setmecount(you.getmecount+1))
            Long followerCount = followRepository.countByFollowerId(follower);
            follower.setFollower_count(followerCount);
            Long followingCount = followRepository.countByFollowingId(following);
            following.setFollowing_count(followingCount);
//            follower.setFollower_count(follower.getFollower_count()+1);
            // me.you_count(me.getyoucount)+1))
//            following.setFollowing_count(following.getFollowing_count()+1);
            userRepository.save(follower);
            userRepository.save(following);

            return 1;
        }
        else {
            followRepository.delete(check);
//            follower.setFollower_count(follower.getFollower_count()-1);
//            following.setFollowing_count(following.getFollowing_count()-1);
            Long followerCount = followRepository.countByFollowerId(follower);
            follower.setFollower_count(followerCount);
            Long followingCount = followRepository.countByFollowingId(following);
            following.setFollowing_count(followingCount);
            userRepository.save(follower);
            userRepository.save(following);
            return 2;
        }
    }

    @Override
    public List<ResponseFollower> searchFollowerList(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId).orElse(null);
        List<Follow> followerList = followRepository.findAllByFollowerId(user, pageable).orElseGet(null);
//      팔로워만 뽑아내기 위한 초기화
        List<ResponseFollower> followers = new ArrayList<>();

        for (int i=0; i<followerList.size(); i++) {
            User follower = followerList.get(i).getFollowingId();
            followers.add(new ModelMapper().map(follower, ResponseFollower.class));
        }
        return followers;
    }

    @Override
    public List<ResponseFollowing> searchFollowingList(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId).orElse(null);
        List<Follow> followingList = followRepository.findAllByFollowingId(user, pageable).orElseGet(null);
//      팔로워만 뽑아내기 위한 초기화
        List<ResponseFollowing> followings = new ArrayList<>();

        for (int i=0; i<followingList.size(); i++) {
            User following = followingList.get(i).getFollowerId();
            followings.add(new ModelMapper().map(following, ResponseFollowing.class));
        }
        return followings;
    }

    @Override
    public int check(Long followerId, Long followingId) {
        // 팔로워 == 주체
        User follower = userRepository.findById(followerId).orElse(null);
        if (follower==null) return 3;

        // 팔로잉 == 상대방
        User following = userRepository.findById(followingId).orElse(null);
        if (following==null) return 4;

        Follow follow = followRepository.findByFollowerIdAndFollowingId(follower, following).orElse(null);
        if (follow==null) return 2;
        return 1;
    }
}
