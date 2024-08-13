package com.skripsi.skripsi.dto;

import com.skripsi.skripsi.entity.RefSkillProgramming;
import com.skripsi.skripsi.entity.TbPegawai;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
public class TbKriteriaPegawaiDTO {

    private Integer id;
    private String namaPegawai;
    private String lvlKemampuanCoding;
    private List<String> listPelatihan;
    private Integer jumlahPengalaman;
    private Integer jumlahProjectOngoing;
    private List<String> listStack;

}
