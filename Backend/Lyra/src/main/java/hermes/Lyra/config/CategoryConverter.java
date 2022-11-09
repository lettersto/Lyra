package hermes.Lyra.config;

import hermes.Lyra.domain.Category;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
@Slf4j
public class CategoryConverter implements AttributeConverter<Category, String> {

    @Override
    public String convertToDatabaseColumn(Category category) {
        if (category == null) return null;
        return category.getValue();
    }

    @Override
    public Category convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        try {
            return Category.fromCode(dbData);
        } catch (IllegalArgumentException e) {
            log.error(dbData, e);
            throw e;
        }
    }
}
