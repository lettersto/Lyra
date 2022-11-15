package hermes.Lyra.vo;


import hermes.Lyra.domain.User;
import lombok.Data;


@Data
public class ResponseSupport3 {

    private Long supporterId;

    private String supporterImage_url;

    private String supporterNickname;

    private Integer coin;

    private String content;

}
