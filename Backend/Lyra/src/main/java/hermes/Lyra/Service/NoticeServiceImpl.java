package hermes.Lyra.Service;

import hermes.Lyra.domain.Notice;
import hermes.Lyra.domain.Repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticeServiceImpl implements NoticeService {
    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Notice findById(Long noticeId) {
        return noticeRepository.findById(noticeId).orElseGet(null);
    }

    @Override
    public List<Notice> findAll() {
        return noticeRepository.findAll(Sort.by("writtenTimes").descending());
    }
}
