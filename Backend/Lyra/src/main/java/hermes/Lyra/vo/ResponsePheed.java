package hermes.Lyra.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import hermes.Lyra.domain.Comment;
import hermes.Lyra.domain.PheedImg;
import hermes.Lyra.domain.PheedTag;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
public class ResponsePheed {

    private Long pheedId;

    private Long userId;

    private String title;

    private String content;

    private Timestamp startTime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String location;

    List<PheedImg> pheedImg = new ArrayList<>();

    private String category;

    List<PheedTag> pheedTag = new ArrayList<>();

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp time;

    List<ResponseComment> comment = new ArrayList<>();
}
