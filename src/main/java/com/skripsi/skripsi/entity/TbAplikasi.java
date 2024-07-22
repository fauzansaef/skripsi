package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_aplikasi")
@Data
public class TbAplikasi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nama")
    private String nama;
    @Column(name = "bahasa_pemrograman")
    private Integer bahasaPemrograman;
    @Column(name = "database")
    private Integer database;
    @Column(name = "bisnis_owner")
    private String bisnisOwner;
    @Column(name = "versioning")
    private String versioning;
    @Column(name = "tgl_nd")
    private LocalDate tglNd;
    @Column(name = "proses")
    private Integer proses;
    @Column(name = "jenis")
    private Integer jenis;
    @ManyToOne
    @JoinColumn(name = "bahasa_pemrograman", insertable = false, updatable = false)
    private RefBahasaPemrograman refBahasaPemrograman;
    @ManyToOne
    @JoinColumn(name = "database", insertable = false, updatable = false)
    private RefDatabase refDatabase;
}
