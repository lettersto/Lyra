package hermes.Lyra.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@Getter
public class UserDto {
    private Long id;
    private String account;
    private String bank;
    private String image_url;
    private String introduction;
    private String refresh_token;
    private String email;
    private String nickname;
    private BigDecimal latitude;
    private BigDecimal longitude;

    @Builder
    public UserDto(Long id, String account, String bank, String image_url, String introduction, String refresh_token,  String email, String nickname, BigDecimal latitude, BigDecimal longitude) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.account = account;
        this.bank = bank;
        this.image_url = image_url;
        this.introduction = introduction;
        this.refresh_token = refresh_token;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
