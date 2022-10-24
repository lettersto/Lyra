package hermes.user_service.config;

import org.springframework.boot.web.servlet.view.MustacheViewResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        MustacheViewResolver resolver = new MustacheViewResolver();
        // 인코딩 UTF-8
        resolver.setCharset("UTF-8");
        // 너한테 던지는 html파일, UTF-8이야
        resolver.setContentType("text/html; charset=UTF-8");
        // 경로설정
        resolver.setPrefix("classpath:/templates/");
        // html을 만들면 mustache라고 인식한다.
        resolver.setSuffix(".html");

        registry.viewResolver(resolver);
    }
}
