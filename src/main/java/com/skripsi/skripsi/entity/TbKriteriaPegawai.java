package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

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
    @Column(name = "project_ongoing")
    private Integer projectOngoing;
    @Column(name = "pengalaman")
    private Integer pengalaman;
    @Column(name = "pelatihan")
    private Integer pelatihan;
    @Column(name = "stack")
    private Integer stack;
    @ManyToOne
    @JoinColumn(name = "id_pegawai", insertable = false, updatable = false)
    private TbPegawai tbPegawai;
}
