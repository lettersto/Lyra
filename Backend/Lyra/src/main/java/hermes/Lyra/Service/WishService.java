package hermes.Lyra.Service;

import hermes.Lyra.domain.Wish;

import java.util.List;

public interface WishService {
    int wishPheed(Long userId, Long pheedId);

    List<Wish> searchPheedList(Long userId);
}
