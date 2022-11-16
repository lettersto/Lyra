package hermes.Lyra.controller;

import hermes.Lyra.Service.UserService;
import hermes.Lyra.config.JwtTokenProvider;
import hermes.Lyra.domain.User;
import hermes.Lyra.dto.*;
import hermes.Lyra.dto.RequestDto.UserImageRequestDto;
import hermes.Lyra.dto.RequestDto.UserLocationRequestDto;
import hermes.Lyra.dto.RequestDto.UserLoginRequestDto;
import hermes.Lyra.dto.RequestDto.UserUpdateRequestDto;
import hermes.Lyra.dto.ResponseDto.UserLocationResponseDto;
import hermes.Lyra.dto.ResponseDto.UserLoginResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.nio.file.AccessDeniedException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private Environment env;
    private final UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(Environment env, UserService userService) {
        this.env = env;
        this.userService = userService;
    }

    @ApiOperation(value = "로그아웃을 요청한다.",notes = "refresh 토큰으로 로그아웃을 요청한다.") //리프레쉬토큰으로
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value="REFRESH-TOKEN") String refreshToken) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            userService.logout(refreshToken);
            message.setStatus(StatusEnum.OK);
            message.setMessage("로그아웃 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (Exception e){
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("ACCESS TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "회원정보를 얻어온다.",notes = "userId에 해당하는 회원 정보를 얻어온다.")
    @GetMapping("info/{userId}")
    public ResponseEntity<?> searchUser(@PathVariable("userId") Long userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            UserDto user = userService.searchUser(userId);
            message.setStatus(StatusEnum.OK);
            message.setMessage("회원정보 불러오기 성공");
            message.setData(user);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원 정보를 수정한다.",notes = "userId에 해당하는 회원 정보를 수정한다")
    @PatchMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody UserUpdateRequestDto userUpdateRequestDto
            ){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = userService.updateUser(userId,userUpdateRequestDto);
            if(result==1){
                message.setStatus(StatusEnum.OK);
                message.setMessage("회원정보 수정 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("회원정보 수정 실패");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }

        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원 이미지 경로를 수정한다.",notes = "userId에 해당하는 회원 이미지 경로를 수정한다")
    @PatchMapping("/updateImage/{userId}")
    public ResponseEntity<?> updateImage(
            @PathVariable("userId") Long userId,
            @RequestBody UserImageRequestDto userImageRequestDto
            ){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = userService.updateImage(userId,userImageRequestDto);
            if(result==1){
                message.setStatus(StatusEnum.OK);
                message.setMessage("회원 이미지 경로 수정 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("회원 이미지 경로 수정 실패");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }

        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원정보를 삭제한다.",notes = "userId에 해당하는 회원 정보를 삭제한다.")
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = userService.deleteUser(userId);
            if(result==1){
                message.setStatus(StatusEnum.OK);
                message.setMessage("회원정보 삭제 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("회원정보 삭제 실패");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }

        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "access token 재발급 요청",notes = "refresh 토큰으로 access 토큰을 재발급 신청한다.")
    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refreshToken(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="REFRESH-TOKEN") String refreshToken ) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            message.setStatus(StatusEnum.OK);
            message.setMessage("ACCESS TOKEN 재발급 성공");
            message.setData(userService.refreshToken(token, refreshToken));
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (AccessDeniedException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.UNAUTHORIZED);
            message.setMessage("REFRESH TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalStateException e){
            e.printStackTrace();
            return new ResponseEntity<String>("RE LOGIN", HttpStatus.PAYMENT_REQUIRED);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "로그인을 요청한다.",notes = "refresh 토큰으로 로그인을 요청한다.") //리프레쉬토큰으로
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody UserLoginRequestDto userLoginRequestDto) {
        // userId로 확인한 값이 DB에 저장되어 있는지 확인 있으면 User 가져오고, 없으면 만들어서 User에 할당
        User user = userService.join(userLoginRequestDto);
        String accessToken = jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
        return ResponseEntity.ok(UserLoginResponseDto.of(200, "가입에 성공했습니다", user.getId(), user.getEmail(), user.getNickname(), accessToken, user.getRefreshToken()));
    }

    @ApiOperation(value = "유저 아이디에 위치 정보를 추가한다.", notes = "유저 아이디에 위치 정보를 추가한다")
    @PatchMapping("/location/{userId}")
    public ResponseEntity<?> addUserLocation(
            @PathVariable("userId") Long userId,
            @RequestBody UserLocationRequestDto userLocationRequestDto
    ) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            User user = userService.addLocation(userId, userLocationRequestDto);
            message.setStatus(StatusEnum.OK);
            message.setMessage("회원 위치정보 추가 성공");
            message.setData(user);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (NullPointerException e) {
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }


//    @ApiOperation(value = "닉네임으로 회원 리스트를 조회한다.",notes = "닉네임으로 회원들의 리스트를 조회한다.")
//    @GetMapping("/api/temp/user/search/{nickname}") // /{page}
//    public ResponseEntity<?> searchUserByNick(@PathVariable("nickname") String nickname){
//        Message message = new Message();
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        try {
//            List<UserResponseDto> user = userService.searchByNick(nickname);
//            message.setStatus(StatusEnum.OK);
//            message.setMessage("닉네임 회원정보 조회 성공");
//            message.setData(user);
//            return new ResponseEntity<>(message, headers, HttpStatus.OK);
//        } catch (IllegalArgumentException | IllegalStateException e){
//            e.printStackTrace();
//            message.setStatus(StatusEnum.BAD_REQUEST);
//            message.setMessage("회원 정보가 없습니다.");
//            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
//        } catch (Exception e){
//            e.printStackTrace();
//            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
//            message.setMessage("서버 에러 발생");
//            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @ApiOperation(value = "사용자 프로필 사진 수정(저장) 요청" ,notes = "사용자의 프로필 사진을 수정 요청한다.")
//    @ApiImplicitParams(
//            {
//                    @ApiImplicitParam(name = "file",value = "사용자 이미지 파일"),
//                    @ApiImplicitParam(name = "userId",value = "사용자 userId"),
//            })
//    @PostMapping("/api/temp/profile/{userId}")
//    public ResponseEntity<?> updateProfileImg(@RequestParam("file") MultipartFile file, @PathVariable("userId") long userId) {
//        Message message = new Message();
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//
//        try {
//            if (file != null) {
//                String fileOriName = file.getOriginalFilename();
//                String fileName = userId+"_"+fileOriName;
////                String savePath = System.getProperty("user.home") +"/upload";
//                String savePath = System.getProperty("user.dir") +"/upload";
//
//                if (!new File(savePath).exists()) {
//                    try {
//                        new File(savePath).mkdir();
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                }
//                String fileUrl = savePath +  File.separator + fileName;
//
//                file.transferTo(new File(fileUrl));
//                System.out.println(">>>>"+fileUrl);
//                userService.saveFile(userId,"/upload/"+fileName);
//                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//            } else {
//                return new ResponseEntity<String>("CHECK FILE", HttpStatus.BAD_REQUEST);
//            }
//        } catch (IllegalStateException e){
//            e.printStackTrace();
//            return new ResponseEntity<String>("CHECK EMAIL", HttpStatus.BAD_REQUEST);
//        } catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @ApiOperation(value = "사용자 프로필 사진파일 요청" ,notes = "사용자의 프로필 사진파일을 요청한다.")
//    @ApiImplicitParam(name = "userId",value = "사용자 userId",dataType = "long",paramType = "path")
//    @GetMapping("/api/temp/profile/{userId}")
//    public ResponseEntity<?> getProfileImg(@PathVariable("userId") long userId) throws IOException {
//        Message message = new Message();
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//
//        String img = userService.getFile(userId);
//
//        message.setStatus(StatusEnum.OK);
//        message.setMessage("사용자의 프로필 사진 조회 성공");
//        message.setData(img);
//
//        return new ResponseEntity<>(message, headers, HttpStatus.OK);
//    }

//    @ApiOperation(value = "로그인 요청",notes = "email과 password로 로그인을 요청한다.")
//    @PostMapping("/api/auth/user/login")
//    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginDto){
//        Message message = new Message();
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        try {
//            UserLoginDto user = userService.login(userLoginDto);
//            message.setStatus(StatusEnum.OK);
//            message.setMessage("로그인 성공");
//            message.setData(user);
//            return new ResponseEntity<>(message, headers, HttpStatus.OK);
//        } catch (IllegalArgumentException | IllegalStateException e){
//            e.printStackTrace();
//            message.setStatus(StatusEnum.BAD_REQUEST);
//            message.setMessage("이메일 혹은 비밀번호가 맞지 않습니다.");
//            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
//        } catch (Exception e){
//            e.printStackTrace();
//            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
//            message.setMessage("서버 에러 발생");
//            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}

