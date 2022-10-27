package hermes.businessservice.service;

import hermes.businessservice.entity.Pheed;


public interface PheedService {

    Iterable<Pheed> getPheedByCategory(String category);
}
