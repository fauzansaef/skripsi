package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "tb_kriteria_pegawai_matrix")
@Data
public class TbKriteriaPegawaiMatrix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "id_pegawai")
    private Integer idPegawai;
    @Column(name = "kemampuan_coding")
    private double kemampuanCoding;
    @Column(name = "project_ongoing")
    private double projectOngoing;
    @Column(name = "pengalaman")
    private double pengalaman;
    @Column(name = "pelatihan")
    private double pelatihan;
    @Column(name = "stack")
    private double stack;
    @ManyToOne
    @JoinColumn(name = "id_pegawai", insertable = false, updatable = false)
    private TbPegawai tbPegawai;
}
