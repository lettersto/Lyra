package hermes.Lyra.dto.RequestDto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginRequestDto {
    String email;
    String image_url;
    String nickname;
}
