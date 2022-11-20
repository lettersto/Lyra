package hermes.Lyra.controller;

import hermes.Lyra.Service.FirebaseCloudMessageService;
import hermes.Lyra.Service.PheedService;
import hermes.Lyra.Service.WishService;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.User;
import hermes.Lyra.domain.Wish;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FirebaseController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    private final WishService wishService;

    private final PheedService pheedService;

    @PostMapping("/fcm")
    public ResponseEntity pushMessage(@RequestParam("pheed_id") Long pheedId) throws IOException {

        List<User> userList = wishService.searchUserList(pheedId);

        Pheed pheed = pheedService.getPheedById(pheedId).get();

        String nickName = pheed.getUser().getNickname();

        String busk = pheed.getTitle();

        String title = String.format("%s님이 버스킹을 열었습니다 ⭐", nickName);

        System.out.println(title);

        for (User u : userList) {
            String targetToken = u.getFcm();
            System.out.println(targetToken);
            firebaseCloudMessageService.sendMessageTo(
                    targetToken,
                    title,
                    busk);
        }

        return ResponseEntity.ok().build();
    }
}