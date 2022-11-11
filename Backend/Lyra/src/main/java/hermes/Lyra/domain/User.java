package hermes.Lyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;

    @Column(length = 10)
    private String nickname;

    private String introduction;

    private String image_url;

//    private String role;

    private String refreshToken;

    @Column(length = 10)
    private String bank;

    private String account;

    private String holder;

    // 위도
    private BigDecimal latitude;

    // 경도
    private BigDecimal longitude;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnore
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Talk> talks = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "followerId", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Follow> followerList = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "followingId", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Follow> followingList = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "userId", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Wish> wishList = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return null;
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void changeRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }


//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Pheed> pheed = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Comment> comment = new ArrayList<>();

}
