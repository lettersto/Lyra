package hermes.Lyra.Service;

import hermes.Lyra.domain.Shorts;

import java.util.List;

public interface ShortsService {
    Iterable<Shorts> getShorts();

    List<Shorts> getShortsByRegion(String regionCode);
}
