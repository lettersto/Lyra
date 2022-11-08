package hermes.Lyra.dto.RequestDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class UserLocationRequestDto {
    BigDecimal latitude;
    BigDecimal longitude;
}
