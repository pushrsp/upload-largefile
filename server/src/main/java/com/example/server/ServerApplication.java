package com.example.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;

@SpringBootApplication
@Slf4j
public class ServerApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(ServerApplication.class, args);
//        String path = "/Users/pushrsp/Desktop/projects/upload-largefile/server/upload";
//
//        PrintWriter pw = new PrintWriter(path + "/test.txt");
//
//        for (int i = 1; i <= 2; i++) {
//            BufferedReader br = new BufferedReader(new FileReader(path + "/" + i + ".txt"));
//            String line = br.readLine();
//
//            while (line != null) {
//                pw.println(line);
//                line = br.readLine();
//            }
//
//            br.close();
//        }
//
//        pw.flush();
//        pw.close();

    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }

}
