package hermes.Lyra.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NoticeDto {
    String title;
    String content;

    @Builder
    public NoticeDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
