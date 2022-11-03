package hermes.Lyra.dto;


import hermes.Lyra.domain.Pheed;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class CommentDto {

    private String content;

    private Timestamp time;

    private Long userId;

    private Pheed pheed;

}
