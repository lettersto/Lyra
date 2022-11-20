package hermes.Lyra.controller;

import hermes.Lyra.Service.FirebaseCloudMessageService;
import hermes.Lyra.vo.RequestFirebase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FirebaseController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @PostMapping("/fcm")
    public ResponseEntity pushMessage(@RequestBody RequestFirebase requestFirebase) throws IOException {
        System.out.println(requestFirebase.getTargetToken() + " "
                +requestFirebase.getTitle() + " " + requestFirebase.getBody());

        firebaseCloudMessageService.sendMessageTo(
                requestFirebase.getTargetToken(),
                requestFirebase.getTitle(),
                requestFirebase.getBody());
        return ResponseEntity.ok().build();
    }
}