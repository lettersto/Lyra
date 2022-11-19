package hermes.Lyra.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import hermes.Lyra.domain.PheedImg;
import hermes.Lyra.domain.PheedTag;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
public class ResponsePheed {

    private Long userId;

    private String userImage_url;

    private String userNickname;

    private Long pheedId;

    List<ResponseWish> wishList = new ArrayList<>();

    private String title;

    private String content;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
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

    private String regionCode;

}
