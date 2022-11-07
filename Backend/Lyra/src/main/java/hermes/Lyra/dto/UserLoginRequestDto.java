package hermes.Lyra.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginRequestDto {
    String email;
    String name;
    String image_url;
    String nickname;
}
