package hermes.businessservice.service;

import hermes.businessservice.entity.Pheed;
import hermes.businessservice.entity.Tag;

import java.util.Optional;

public interface TagService {

    Tag save(Tag tag);

    Optional<Tag> partialUpdate(Tag tag);
}
