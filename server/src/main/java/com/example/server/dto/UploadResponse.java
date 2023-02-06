package com.example.server.dto;

import lombok.Data;

@Data
public class UploadResponse {

    Boolean success;

    public UploadResponse(Boolean success) {
        this.success = success;
    }

}
