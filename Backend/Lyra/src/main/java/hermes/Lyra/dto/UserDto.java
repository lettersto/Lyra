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
    private String holder;
    private String image_url;
    private String introduction;
    private String refresh_token;
    private String email;
    private String nickname;
    private String region_code;
    private String region_name;
    private Long follower_count;
    private Long following_count;
    private BigDecimal latitude;
    private BigDecimal longitude;

    @Builder
    public UserDto(Long id, String account, String bank, String holder, String image_url, String introduction, String refresh_token,  String email, String nickname, String region_code, String region_name, BigDecimal latitude, BigDecimal longitude, Long follower_count, Long following_count) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.account = account;
        this.bank = bank;
        this.holder = holder;
        this.image_url = image_url;
        this.introduction = introduction;
        this.refresh_token = refresh_token;
        this.region_code = region_code;
        this.region_name = region_name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.follower_count = follower_count;
        this.following_count = following_count;
    }
}
