package hermes.Lyra.Service;

import hermes.Lyra.domain.Notice;
import hermes.Lyra.dto.RequestDto.NoticeRequestDto;

import java.util.List;
import java.util.Optional;

public interface NoticeService {
    Notice findById(Long noticeId);
    List<Notice> findAll();

    Notice createNotice(NoticeRequestDto noticeRequestDto);

    int updateNotice(Long noticeId, NoticeRequestDto noticeRequestDto);

    void deleteNotice(Long noticeId);
}
