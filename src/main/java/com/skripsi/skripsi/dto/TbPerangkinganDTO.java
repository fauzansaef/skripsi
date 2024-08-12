package com.skripsi.skripsi.dto;

import com.skripsi.skripsi.entity.TbPegawai;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
public class TbPerangkinganDTO {

    private Integer idPegawai;
    private double perhitunganAlternatif;
    private LocalDate tanggalPerangkingan;
    private TbPegawai tbPegawai;
}
