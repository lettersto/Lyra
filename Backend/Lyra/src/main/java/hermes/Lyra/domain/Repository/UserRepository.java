package hermes.user_service.domain.Repository;

import hermes.user_service.domain.User;
import hermes.user_service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collections;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    @PersistenceContext
    private final EntityManager em;

    public void save(User user){
        //
        /* 닉네임이 비어있다면 이메일의 @앞까지 넣어주기 */
        if(user.getNickname() == null || user.getNickname() == ""){
            String email = user.getEmail();
            email = email.substring(0,email.indexOf("@"));
            user.setNickname(email);
        }
        user.setRoles(Collections.singletonList("ROLE_USER"));
        em.persist(user);
    }

    public User findOne(Long id){
        User findUser = em.find(User.class, id);
        return findUser;
    }

    public boolean existsByEmail(String email){
        List<User> userList = em.createQuery("select u from User u where u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();
        if(userList.size() == 0) return false;
        return true;
    }

    public boolean isLogout(String email){
        User findUser = findByEmail(email);
        if(findUser.getRefreshToken().equals("invalid")) return true;
        return false;
    }

    public User findByEmail(String email) throws IllegalStateException {
        List<User> userList = em.createQuery("select u from User u where u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();
        if(userList.size() == 0) throw new IllegalStateException("해당 이메일을 가진 사용자가 없습니다.");
        return userList.get(0);
    }

    public void socialLogin(String email, String refresh){
        User user = findByEmail(email);
        user.changeRefreshToken(refresh);
    }

    public List<User> findAll(){
        List<User> userList = em.createQuery("select u from User u", User.class)
                .getResultList();

        return userList;
    }

    public User searchOne(Long id){
        User findUser = em.find(User.class, id);
        if(findUser == null)throw new NullPointerException();
        return findUser;
    }


    public int updateUserNickname(Long id, String nickname) {
        User user = searchOne(id);
        user.setNickname(nickname);
        em.persist(user);

        User finduser = searchOne(id);
        if(finduser.getNickname()==nickname) return 1;
        else return 0;
    }

    public int deleteById(Long id){
        User user = searchOne(id);
        em.remove(user);
        User find = em.find(User.class, id);
        if (find == null) return 1;
        else return 0;
    }

    public UserDto searchUser(Long id){
        User user = searchOne(id);

        UserDto userDto = UserDto.builder()
//                .id(id)
                .email(user.getEmail())
                .name(user.getName())
//                .nickname(user.getNickname())
//                .profilePath(user.getProfilePath())
                .build();
        return userDto;
    }

}
