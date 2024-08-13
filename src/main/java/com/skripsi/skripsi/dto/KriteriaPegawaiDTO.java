package com.skripsi.skripsi.dto;

import lombok.Data;

@Data
public class KriteriaPegawaiDTO {
    private Integer idPegawai;
    private Integer kemampuanCoding;
    private Integer [] jumlahPelatihan;
    private Integer [] penguasaanStack;
}
