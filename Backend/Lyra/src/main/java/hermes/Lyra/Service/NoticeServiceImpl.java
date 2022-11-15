package hermes.Lyra.Service;

import hermes.Lyra.domain.Notice;
import hermes.Lyra.domain.Repository.NoticeRepository;
import hermes.Lyra.dto.RequestDto.NoticeRequestDto;
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

    @Override
    public Notice createNotice(NoticeRequestDto noticeRequestDto) {
        Notice notice = new Notice();
        notice.setTitle(noticeRequestDto.getTitle());
        notice.setContent(noticeRequestDto.getContent());
        noticeRepository.save(notice);
        return notice;
    }

    @Override
    public int updateNotice(Long noticeId, NoticeRequestDto noticeRequestDto) {
        Notice notice = noticeRepository.findById(noticeId).orElse(null);
        if (notice == null) return 3;
        System.out.println("hi");
        notice.setTitle(noticeRequestDto.getTitle());
        notice.setContent(noticeRequestDto.getContent());
        noticeRepository.save(notice);
        return 1;
    }

    @Override
    public void deleteNotice(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId).orElse(null);
        if (notice==null) {
            return;
        }
        noticeRepository.delete(notice);
        return;
    }
}
