FROM openjdk:11-jdk
WORKDIR /var/jenkins_home/workspace/lyra/backend/config-service
EXPOSE 8888
CMD ["./gradlew", "clean", "build"]
VOLUME /tmp
ARG JAR_FILE=build/libs/app.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata