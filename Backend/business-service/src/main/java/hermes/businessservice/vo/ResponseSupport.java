package hermes.businessservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseSupport {

    private Long supporterId;

    private Long buskerId;

    private Integer coin;

    private String content;

}
