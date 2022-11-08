package hermes.Lyra.dto.ResponseDto;

import hermes.Lyra.dto.BaseResponseBody;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLocationResponseDto extends BaseResponseBody {
    Long id;
    String email;
    String nickname;
    BigDecimal latitude;
    BigDecimal longitude;

    public UserLocationResponseDto() {

    }

    public static UserLocationResponseDto of(Integer statusCode, String message, Long id, String email, String nickname, BigDecimal latitude, BigDecimal longitude) {
        UserLocationResponseDto res = new UserLocationResponseDto();
        res.setEmail(email);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setId(id);
        res.setNickname(nickname);
        res.setLatitude(latitude);
        res.setLongitude(longitude);
        return res;
    }
}
