package hermes.Lyra.Service;

import hermes.Lyra.domain.Notice;

import java.util.List;
import java.util.Optional;

public interface NoticeService {
    Optional<Notice> getNotice(Long noticeId);

    List<Notice> findAll();
}
