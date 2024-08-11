package com.skripsi.skripsi.utility;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageResponse {
    private int status;
    private String message;
    private Object data;
}
