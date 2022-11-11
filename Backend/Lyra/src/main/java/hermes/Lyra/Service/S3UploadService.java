package hermes.Lyra.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.util.IOUtils;
import hermes.Lyra.domain.Pheed;
import hermes.Lyra.domain.PheedImg;
import hermes.Lyra.domain.Repository.PheedImgRepository;
import hermes.Lyra.domain.Repository.PheedRepository;
import hermes.Lyra.domain.Repository.ShortsRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.Shorts;
import hermes.Lyra.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class S3UploadService {

    private String bucket = "lyra-hermes";

    private final AmazonS3 amazonS3;

    private final PheedImgRepository pheedImgRepository;

    private final PheedRepository pheedRepository;

    private final ShortsRepository shortsRepository;

    private final UserRepository2 userRepository2;


    public List upload(List<MultipartFile> images, Pheed newPheed) throws IOException {

        List imgList = new ArrayList<>();

        for (MultipartFile v : images) {
            String s3FileName = UUID.randomUUID() + "-" + v.getOriginalFilename();
            byte[] bytes = new byte[0];
            bytes = IOUtils.toByteArray(v.getInputStream());

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(bytes.length);
            objectMetadata.setContentType(v.getContentType());

            amazonS3.putObject(bucket, s3FileName, v.getInputStream(), objectMetadata);

            URL path = amazonS3.getUrl(bucket, s3FileName);
            imgList.add(path.toString());

            PheedImg pheedImg = new PheedImg();

            pheedImg.setPheed(newPheed);

            pheedImg.setPath(path.toString());

            pheedImgRepository.save(pheedImg);

        }

        return imgList;
    }

    public List update(List<MultipartFile> images, Pheed newPheed, Long pheedId) throws IOException {

        pheedImgRepository.deleteByPheed(newPheed);

        List imgList = new ArrayList<>();

        for (MultipartFile v : images) {
            String s3FileName = UUID.randomUUID() + "-" + v.getOriginalFilename();
            byte[] bytes = new byte[0];
            bytes = IOUtils.toByteArray(v.getInputStream());

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(bytes.length);
            objectMetadata.setContentType(v.getContentType());

            amazonS3.putObject(bucket, s3FileName, v.getInputStream(), objectMetadata);

            URL path = amazonS3.getUrl(bucket, s3FileName);
            imgList.add(path.toString());

            PheedImg pheedImg = new PheedImg();

            pheedImg.setPheed(newPheed);

            pheedImg.setPath(path.toString());

            pheedImgRepository.save(pheedImg);

        }

        return imgList;
    }

    public void delete(Long pheedId) {

        Optional<Pheed> p = pheedRepository.findById(pheedId);

        pheedImgRepository.deleteByPheed(p.get());

    }

    public void uploadShorts(Long userId, MultipartFile video, String title) throws IOException {

        String s3FileName = UUID.randomUUID() + "-" + video.getOriginalFilename();
        byte[] bytes = new byte[0];
        bytes = IOUtils.toByteArray(video.getInputStream());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(bytes.length);
        objectMetadata.setContentType(video.getContentType());

        amazonS3.putObject(bucket, s3FileName, video.getInputStream(), objectMetadata);

        URL path = amazonS3.getUrl(bucket, s3FileName);

        Shorts shorts = new Shorts();

        Optional<User> user = userRepository2.findById(userId);

        shorts.setPath(path.toString());

        shorts.setUser(user.get());

        shorts.setTitle(title);

        shortsRepository.save(shorts);

    }

    public void deleteShorts(Long shortsId) {

        shortsRepository.deleteById(shortsId);

    }
}