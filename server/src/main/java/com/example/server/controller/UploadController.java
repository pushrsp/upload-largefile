package com.example.server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class UploadController {

    private final Map<String, FileOutputStream> cache = new HashMap<>();
    @Value("${file.dir}")
    private String fileDir;

    @PostMapping(value = "/upload")
    public void upload(
            @RequestHeader("ChunkId") Integer chunkId,
            @RequestHeader("UniqueFileId") String uniqueFileId,
            @RequestParam MultipartFile chunk,
            @RequestParam boolean finish) throws IOException {
        if (cache.get(uniqueFileId) == null)
            cache.put(uniqueFileId, new FileOutputStream(fileDir + uniqueFileId + ".mp4"));

        FileOutputStream out = cache.get(uniqueFileId);
        out.write(chunk.getBytes());

        if (finish)
            clear(uniqueFileId);

    }

    private void clear(String key) throws IOException {
        FileOutputStream file = cache.get(key);
        file.flush();
        file.close();

        cache.remove(key);
    }

}
