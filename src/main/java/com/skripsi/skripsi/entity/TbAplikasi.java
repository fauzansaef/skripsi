package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tb_aplikasi")
@Data
public class TbAplikasi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nama")
    private String nama;
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
    @Column(name = "analis")
    private Integer analis;
    @Column(name = "nd_request")
    private String ndRequest;
    @Column(name = "stack")
    private String stack;
    @Column(name = "created_at")
    private LocalDate createdAt;
    @Column(name = "id_approval")
    private Integer idApproval;
    @ManyToOne
    @JoinColumn(name = "analis", insertable = false, updatable = false)
    private TbPegawai tbPegawaiAnalis;
    @ManyToOne
    @JoinColumn(name = "id_approval", insertable = false, updatable = false)
    private TbPegawai tbPegawaiApproval;

    //    @OneToMany(mappedBy = "aplikasi", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<TrxBahasaPemrograman> bahasaPemrograman;
//    @OneToMany(mappedBy = "aplikasi", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<TrxJenisDatabase> jenisDatabase;
    @OneToMany(mappedBy = "tbAplikasi", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TbTim> tim;

}
