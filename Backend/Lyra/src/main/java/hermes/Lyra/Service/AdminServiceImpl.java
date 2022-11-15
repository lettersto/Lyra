package hermes.Lyra.Service;

import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository2 userRepository2;
    public int changeRole(Long userId) {
        User user = userRepository2.findById(userId).orElse(null);
        if (user == null) return 3;
        List<String> roles = user.getRoles();
        if (roles.get(roles.size()-1).equals("ROLE_USER")) {
            roles.add("ROLE_ADMIN");
            user.setRoles(roles);
            userRepository2.save(user);
            return 1;
        } else {
            roles.remove(1);
            user.setRoles(roles);
            userRepository2.save(user);
            return 2;
        }
    }
}
