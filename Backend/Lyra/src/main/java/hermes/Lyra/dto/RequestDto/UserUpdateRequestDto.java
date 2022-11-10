package hermes.Lyra.dto.RequestDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateRequestDto {
    Long id;
    String nickname;
    String introduction;
    String bank;
    String account;
}
