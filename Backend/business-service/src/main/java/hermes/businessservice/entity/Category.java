package hermes.businessservice.entity;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Category {
    SONG("노래"),
    DANCE("춤"),
    INSTRUMENT("악기"),
    ART("미술"),
    ETC("기타");

    private String value;

    Category(String value) {
        this.value = value;
    }

    public static Category fromCode(String dbData) {
        return Arrays.stream(Category.values())
                .filter(v -> v.getValue().equals(dbData))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException(String.format("아이템 카테고리에 %s가 존재하지 않습니다", dbData)));
    };
}
