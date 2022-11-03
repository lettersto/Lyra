package hermes.Lyra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLoginResponseDto {
    String email;
    String accessToken;
    String refreshToken;
    Long id;
    String nickname;
}
