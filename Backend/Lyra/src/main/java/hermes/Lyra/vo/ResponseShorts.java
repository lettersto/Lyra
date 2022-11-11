package hermes.Lyra.vo;

import hermes.Lyra.domain.User;
import lombok.Data;

@Data
public class ResponseShorts {

    private Long shortsId;

    private Long userId;

    private String userImage_url;

    private String userNickname;

//    private User user;

    private String path;

    private String title;
}
