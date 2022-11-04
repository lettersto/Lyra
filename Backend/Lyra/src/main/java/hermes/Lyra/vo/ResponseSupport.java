package hermes.Lyra.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import hermes.Lyra.domain.User;
import lombok.Data;


@Data
public class ResponseSupport {

    private User busker;

//    private Long BuskerId;

    private Integer coin;

    private String content;

    private String ca;

}
