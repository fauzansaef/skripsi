package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_kriteria_pegawai")
@Data
public class TbKriteriaPegawai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "id_pegawai")
    private Integer idPegawai;
    @Column(name = "kemampuan_coding")
    private Integer kemampuanCoding;
    @Column(name = "jumlah_pelatihan")
    private String jumlahPelatihan;
    @Column(name = "jumlah_pengalaman")
    private Integer jumlahPengalaman; //hitung jumlah project yang dikerjakan pegawai yang proses = deploy
    @Column(name = "jumlah_project_ongoing")
    private Integer jumlahProjectOngoing; //hitung jumlah project yang dikerjakan pegawai yang proses = pengembangan
    @Column(name = "penguasaan_stack")
    private String penguasaanStack;
    @ManyToOne
    @JoinColumn(name = "id_pegawai", insertable = false, updatable = false)
    private TbPegawai tbPegawai;
    @ManyToOne
    @JoinColumn(name = "kemampuan_coding", insertable = false, updatable = false)
    private RefSkillProgramming refSkillProgramming;




}
