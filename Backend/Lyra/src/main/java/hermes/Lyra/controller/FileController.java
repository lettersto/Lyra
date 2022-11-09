//package hermes.Lyra.controller;
//
//import hermes.Lyra.Service.S3Upload;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//
//@RestController
//public class FileController {
//
//    private final S3Upload s3Upload;
//
//    public FileController(S3Upload s3Upload) {
//        this.s3Upload = s3Upload;
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("images") MultipartFile multipartFile) throws IOException {
//        String result = s3Upload.upload(multipartFile);
////        return ResponseEntity.success(
////                HttpStatus.CREATED, s3Upload.upload(multipartFile);
////        );
//        return new ResponseEntity<String>(result, HttpStatus.OK);
//    }
//}
//