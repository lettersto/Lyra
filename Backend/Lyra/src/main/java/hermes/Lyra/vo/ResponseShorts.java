package hermes.Lyra.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import hermes.Lyra.domain.User;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ResponseShorts {

    private Long shortsId;

    private Long userId;

    private String userImage_url;

    private String userNickname;

//    private User user;

    private String path;

    private String title;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp time;
}
