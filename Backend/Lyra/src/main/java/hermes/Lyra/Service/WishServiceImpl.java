package hermes.Lyra.Service;

import hermes.Lyra.domain.Wish;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.Repository.WishRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            wishRepository.save(wish);
            return 1;
        }
        else {
            wishRepository.delete(check);
            return 2;
        }
    }

    @Override
    public List<Wish> searchPheedList(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return wishRepository.findAllByUserId(user).orElseGet(null);
    }

}
