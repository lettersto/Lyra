package hermes.Lyra.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseRoom {

    List<ResponseParticipant> participant = new ArrayList<>();

}
