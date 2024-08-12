package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "tb_tim")
@Data
public class TbTim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "id_pegawai")
    private Integer idPegawai;
    @Column(name = "role_project")
    private String roleProject;
    @Column(name = "id_aplikasi")
    private Integer idAplikasi;
    @Column(name = "surat_tugas")
    private String suratTugas;
    @ManyToOne
    @JoinColumn(name = "id_pegawai", insertable = false, updatable = false)
    private TbPegawai tbPegawai;
    @ManyToOne
    @JoinColumn(name = "id_aplikasi", insertable = false, updatable = false)
    private TbAplikasi tbAplikasi;
}
