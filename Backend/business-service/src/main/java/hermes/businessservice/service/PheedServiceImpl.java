package hermes.businessservice.service;

import hermes.businessservice.entity.Pheed;
import hermes.businessservice.repository.PheedRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PheedServiceImpl implements PheedService{

    private final PheedRepository pheedRepository;

    @Autowired
    public PheedServiceImpl(PheedRepository pheedRepository) {
        this.pheedRepository = pheedRepository;
    }

    @Override
    public Iterable<Pheed> getPheedByCategory(String category) {
        return pheedRepository.findByCategory(category);
    }


}
