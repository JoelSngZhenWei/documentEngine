# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-24 AS build
WORKDIR /workspace
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests clean package

# ---------- Runtime stage ----------
FROM eclipse-temurin:24-jdk
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]