package hermes.Lyra.vo;

import hermes.Lyra.domain.User;
import lombok.Data;

@Data
public class ResponseShorts {

    private Long shortsId;

    private User user;

    private String path;
}
