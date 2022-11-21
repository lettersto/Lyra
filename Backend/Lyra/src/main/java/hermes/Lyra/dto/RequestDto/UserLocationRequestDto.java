package hermes.Lyra.dto.RequestDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class UserLocationRequestDto {
    String region_code;
    String region_name;
    BigDecimal latitude;
    BigDecimal longitude;
}
