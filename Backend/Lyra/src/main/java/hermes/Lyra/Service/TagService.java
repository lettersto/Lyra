package hermes.Lyra.Service;


import hermes.Lyra.domain.Tag;

import java.util.Optional;

public interface TagService {

    Tag save(Tag tag);

    Optional<Tag> partialUpdate(Tag tag);
}
