package hermes.businessservice.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestComment {

    @NotNull(message = "content cannot be null")
    private String content;
}
