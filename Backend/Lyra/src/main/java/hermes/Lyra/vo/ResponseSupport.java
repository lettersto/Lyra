package hermes.Lyra.vo;

import hermes.Lyra.domain.User;
import lombok.Data;


@Data
public class ResponseSupport {

//    private User busker;

    private Long buskerId;

    private String buskerImage_url;

    private String buskerNickname;

    private Integer coin;

    private String content;

    private String ca;

}
