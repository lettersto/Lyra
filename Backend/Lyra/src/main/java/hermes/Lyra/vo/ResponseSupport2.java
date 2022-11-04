package hermes.Lyra.vo;


import hermes.Lyra.domain.User;
import lombok.Data;


@Data
public class ResponseSupport2 {

    private User supporter;

//    private Long supporterId;

    private Integer coin;

    private String content;

    private String ca;

}
