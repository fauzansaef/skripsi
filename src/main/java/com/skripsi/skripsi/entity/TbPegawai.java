package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "tb_pegawai")
@Data
public class TbPegawai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nama")
    private String nama;
    @Column(name = "nip", unique = true)
    private String nip;
    @Column(name = "no_hp", unique = true)
    private String noHp;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "alamat")
    private String alamat;
    @Column(name = "gol_pangkat")
    private String golPangkat;
    @Column(name = "active")
    private Integer active;
    @Column(name = "kantor")
    private String kantor;
    @Column(name = "unit")
    private String unit;
    @Column(name = "jabatan")
    private String jabatan;

}
