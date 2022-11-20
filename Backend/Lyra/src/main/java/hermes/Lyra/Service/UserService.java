package hermes.Lyra.Service;

import hermes.Lyra.config.JwtTokenProvider;
import hermes.Lyra.domain.Repository.FollowRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.UserRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.User;
import hermes.Lyra.dto.RequestDto.UserImageRequestDto;
import hermes.Lyra.dto.RequestDto.UserLocationRequestDto;
import hermes.Lyra.dto.RequestDto.UserUpdateRequestDto;
import hermes.Lyra.dto.ResponseDto.UserLocationResponseDto;
import hermes.Lyra.dto.UserDto;
import hermes.Lyra.dto.RequestDto.UserLoginRequestDto;
import hermes.Lyra.dto.ResponseDto.UserLoginResponseDto;
import hermes.Lyra.error.Exception.custom.SomethingNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final PheedRepository pheedRepository;
    private final UserRepository2 userRepository2;
    private final JwtTokenProvider jwtTokenProvider;

    private final FollowRepository followRepository;

    @Transactional
    public User addLocation(Long userId, UserLocationRequestDto userLocationRequestDto) {
        User user = userRepository2.findById(userId).orElse(null);
        System.out.println(user.getEmail());
        if (user!=null) {
            if (userLocationRequestDto.getLatitude()!=null) {
                user.setLatitude(userLocationRequestDto.getLatitude());
            }
            if (userLocationRequestDto.getLongitude()!=null) {
                user.setLongitude(userLocationRequestDto.getLongitude());
            }
            if (userLocationRequestDto.getRegion_code()!=null) {
                user.setRegion_code(userLocationRequestDto.getRegion_code());
            }
            if (userLocationRequestDto.getRegion_name()!=null) {
                user.setRegion_name(userLocationRequestDto.getRegion_name());
            }
            userRepository.save(user);
            return user;
        } else {
            try {
                throw new AccessDeniedException("해당 유저가 존재하지 않습니다.");
            } catch (AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Transactional
    public UserDto searchUser(Long userId) {
        UserDto user = userRepository.searchUser(userId);
        user.setEnd_busk_count(pheedRepository.findByUserIdAndState(userId, 2).size());
        User user2 = userRepository2.findById(userId).get();
        Long followerCount = followRepository.countByFollowerId(user2);
        user.setFollower_count(followerCount);
        Long followingCount = followRepository.countByFollowingId(user2);
        user.setFollowing_count(followingCount);
        return user;
    }
    @Transactional
    public int deleteUser(Long userId) {
        return userRepository.deleteById(userId);
    }

    @Transactional
    public User join(UserLoginRequestDto userLoginRequestDto){
        User user = userRepository2.findByEmail(userLoginRequestDto.getEmail()).orElse(null);
        System.out.println("before checking null");
        if(user == null) {
            User newUser = new User();
            System.out.println("input db");
            newUser.setEmail(userLoginRequestDto.getEmail());
            newUser.setNickname(userLoginRequestDto.getNickname());
            newUser.setImage_url(userLoginRequestDto.getImage_url());
            newUser.setFollower_count(0L);
            newUser.setFollowing_count(0L);
            List<String> roles = new ArrayList<>();
            roles.add("ROLE_USER");
            newUser.setRoles(roles);
//            newUser.setRole("ROLE_USER");
            String refreshToken = jwtTokenProvider.createRefreshToken(userLoginRequestDto.getEmail(), roles);
            newUser.changeRefreshToken(refreshToken);
            userRepository.save(newUser);
            return newUser;
        } else {
            user.changeRefreshToken(jwtTokenProvider.createRefreshToken(user.getEmail(), user.getRoles()));
            return user;
        }
    }

    @Transactional
    public UserLoginResponseDto refreshToken(String token, String refreshToken) throws Exception {

        //if(memberRepository.isLogout(jwtTokenProvider.getUserPk(token))) throw new AccessDeniedException("");
        // 아직 만료되지 않은 토큰으로는 refresh 할 수 없음
        if(jwtTokenProvider.validateToken(token)) throw new AccessDeniedException("token이 만료되지 않음");

        User user = userRepository.findByEmail(jwtTokenProvider.getUserPk(refreshToken));
        System.out.println(user.getRefreshToken());
        if(!refreshToken.equals(user.getRefreshToken())) throw new AccessDeniedException("해당 유저가 존재하지 않습니다.");

        if(!jwtTokenProvider.validateToken(user.getRefreshToken()))
            throw new IllegalStateException("다시 로그인 해주세요.");

        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(user.getEmail(), user.getRoles()));

        UserLoginResponseDto userLoginResponseDto = UserLoginResponseDto.builder()
                .email(user.getEmail())
                .accessToken(jwtTokenProvider.createToken(user.getEmail(), user.getRoles()))
                .refreshToken(user.getRefreshToken())
                .id(user.getId()).nickname(user.getNickname())
                .build();

        return userLoginResponseDto;
    }

    @Transactional
    public void logout(String token) throws IllegalStateException {
        boolean result = jwtTokenProvider.validateToken(token);
        if(!result) throw new IllegalStateException("토큰 만료 되었습니다.");
        User user = userRepository.findByEmail(jwtTokenProvider.getUserPk(token));
        user.changeRefreshToken("invalidate");
    }

    @Transactional
    public void joinSocial(UserDto userDto){
        User user = new User();
        user.setEmail(userDto.getEmail());
//        user.setName(userDto.getName());
        userRepository.save(user);
    }

    @Transactional
    public void socialLogin(String email, String refreshToken){
        userRepository.socialLogin(email, refreshToken);
    }

    @Transactional
    public int updateUser(Long userId, UserUpdateRequestDto userUpdateRequestDto) {
        return userRepository.updateUser(userId, userUpdateRequestDto);
    }

    @Transactional
    public int updateImage(Long userId, UserImageRequestDto userImageRequestDto) {
        return userRepository.updateImage(userId, userImageRequestDto);
    }

    @Transactional
    public void updateFcm(Long userId, String fcm) {
        userRepository.updateFcm(userId, fcm);
    }

//    @Transactional
//    public User checkEmail(String email) {
//        boolean userEmailDuplicate = userRepository.existsByEmail(email);
//        if(!userEmailDuplicate) throw new IllegalStateException("해당 이메일에 존재하는 회원이 없습니다.");
//
//        User user = userRepository.findByEmail(email);
//        return user;
//    }

//    @Transactional
//    public void checkEmailDuplicate(String email) {
//        boolean userEmailDuplicate = userRepository.existsByEmail(email);
//        if(userEmailDuplicate) throw new IllegalStateException("이미 존재하는 회원입니다.");
//    }

//    @Transactional
//    public int updateUserNick(Long userId, String nickname){
//        return userRepository.updateUserNickname(userId, nickname);
//    }
//
//    @Transactional
//    public UserLoginResponseDto getUser(String accessToken) throws Exception {
//        String email = jwtTokenProvider.getUserPk(accessToken);
//        User user = userRepository.findByEmail(email);
//        if(user == null) throw new SomethingNotFoundException("user(email:"+email+")");
//        // 리프레쉬 토큰 발급
//        UserLoginResponseDto userDto = UserLoginResponseDto.builder()
//                .email(email)
//                .accessToken(accessToken)
//                .refreshToken(user.getRefreshToken())
//                .id(user.getId()).nickname(user.getNickname())
//                .build();
//
//        return userDto;
//    }
//
//    public UserLoginResponseDto userGet(Long userId) throws Exception {
//        User user = userRepository.findOne(userId);
//
//        UserLoginResponseDto userLoginResponseDto = UserLoginResponseDto.builder()
//                .email(user.getEmail())
//                .id(user.getId()).nickname(user.getNickname())
//                .build();
//
//        return userLoginResponseDto;
//    }

}
