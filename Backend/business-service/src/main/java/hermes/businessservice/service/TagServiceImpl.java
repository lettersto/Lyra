package hermes.businessservice.service;

import hermes.businessservice.entity.Pheed;
import hermes.businessservice.entity.Tag;
import hermes.businessservice.repository.PheedTagRepository;
import hermes.businessservice.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class TagServiceImpl implements TagService{

    TagRepository tagRepository;
    PheedTagRepository pheedTagRepository;


    @Override
    public Tag save(Tag tag) {
        log.debug("Request to save Tag : {}", tag);
        return tagRepository.save(tag);
    }

    @Override
    public Optional<Tag> partialUpdate(Tag tag) {
        log.debug("Request to partially update Tag : {}", tag);

        return tagRepository
                .findById(tag.getId())
                .map(existingTag -> {
                    if (tag.getName() != null) {
                        existingTag.setName(tag.getName());
                    }

                    return existingTag;
                })
                .map(tagRepository::save);
    }
}
