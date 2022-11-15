package hermes.Lyra.Service;

import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface WishService {
    int isRight(Long userId, Long pheedId);

    int wishPheed(Long userId, Long pheedId);

//    List<Pheed> searchPheedList(Long userId);

    List<Pheed> searchPheedList(Long userId, Pageable pageable);

    List<User> searchUserList(Long pheedId);
}
