package com.skripsi.skripsi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AplikasiDTO {
    private String nama;
    private Integer[] listBahasaPemrograman;
    private Integer[] listJenisDatabase;
    private String bisnisOwner;
    private String versioning;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate tglNd;
    private Integer jenis;
    private String ndRequest;
    private Integer [] listStack;
}
