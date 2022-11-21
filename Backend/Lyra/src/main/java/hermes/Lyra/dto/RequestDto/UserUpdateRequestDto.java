package hermes.Lyra.dto.RequestDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateRequestDto {
    String nickname;
    String introduction;
    String bank;
    String account;
    String holder;
}
