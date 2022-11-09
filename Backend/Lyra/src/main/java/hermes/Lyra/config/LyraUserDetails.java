package hermes.Lyra.config;

import hermes.Lyra.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class LyraUserDetails implements UserDetails {

    @Autowired
    private User user;

    private Map<String, Object> attributes;

    public LyraUserDetails(User user) {
        this.user = user;
    }

    public LyraUserDetails(User user, Map<String, Object> attributes ) {
        this.user = user;
        this.attributes = attributes;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub

        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                // TODO Auto-generated method stub
                return user.getRoles().get(0);
            }
        });

        return collect;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return "";
    }

    @Override
    public String getUsername() {
        return user.getNickname();
    }

    public Long getId() {
        // TODO Auto-generated method stub
        return user.getId();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }


    //////////////////////////////////////////////////////////////////////

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
