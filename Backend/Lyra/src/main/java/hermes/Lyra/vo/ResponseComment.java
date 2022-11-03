package hermes.Lyra.vo;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ResponseComment {

    private String content;

    private Timestamp time;

    private Long userId;

//    private Pheed pheed;

}
