package hermes.Lyra.vo;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ResponseCharge {

    private Long coin;

    private Timestamp time;

    private String ca;
}
