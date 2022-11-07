package hermes.Lyra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import hermes.Lyra.dto.BaseResponseBody;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLoginResponseDto extends BaseResponseBody {
    Long id;
    String email;
    String accessToken;
    String refreshToken;
    String nickname;

    public UserLoginResponseDto() {

    }

    public static UserLoginResponseDto of(Integer statusCode ,String message, Long id, String email, String nickname, String accessToken, String refreshToken) {
        UserLoginResponseDto res = new UserLoginResponseDto();
        res.setEmail(email);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setId(id);
        res.setNickname(nickname);
        res.setAccessToken(accessToken);
        res.setRefreshToken(refreshToken);
        return res;
    }
}
