package hermes.Lyra.Service;

import hermes.Lyra.domain.Follow;
import hermes.Lyra.domain.Wish;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Repository.WishRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class WishServiceImpl implements WishService {

    @Autowired
    UserRepository2 userRepository;

    @Autowired
    PheedRepository pheedRepository;

    @Autowired
    WishRepository wishRepository;

    @Override
    public int wishPheed(Long userId, Long pheedId) {
        Wish wish = new Wish();
        User user = userRepository.findById(userId).orElse(null);
        if (user==null) return 3;
        Pheed pheed = pheedRepository.findById(pheedId).orElse(null);
        if (pheed==null) return 4;
        Wish check = wishRepository.findByUserIdAndPheedId(user, pheed).orElse(null);
        if (check==null) {
            wish.setPheedId(pheed);
            wish.setUserId(user);
            pheed.setWishCount(pheed.getWishCount()+1);
            wishRepository.save(wish);
            return 1;
        }
        else {
            pheed.setWishCount(pheed.getWishCount()-1);
            wishRepository.delete(check);
            return 2;
        }
    }

    @Override
    public List<Pheed> searchPheedList(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId).orElse(null);
        List<Wish> wishList = wishRepository.findAllByUserId(user, pageable).orElseGet(null);
//      피드만 뽑아내기 위한 초기화
        List<Pheed> pheeds = new ArrayList<>();

        for (int i=0; i<wishList.size(); i++) {
            Pheed pheed = wishList.get(i).getPheedId();
            pheeds.add(pheed);
        }
        return pheeds;
    }

    @Override
    public List<User> searchUserList(Long pheedId) {
        Pheed pheed = pheedRepository.findById(pheedId).orElse(null);
        List<Wish> wishList = wishRepository.findAllByPheedId(pheed).orElseGet(null);
        List<User> users = new ArrayList<>();
        for (int i=0; i<wishList.size(); i++) {
            User user = wishList.get(i).getUserId();
            users.add(user);
        }
        return users;
    }

    @Override
    public int isRight(Long userId, Long pheedId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user==null) return 3;
        Pheed pheed = pheedRepository.findById(pheedId).orElse(null);
        if (pheed==null) return 4;

        Wish wish = wishRepository.findByUserIdAndPheedId(user, pheed).orElse(null);
        if (wish==null) return 2;
        return 1;
    }
}
