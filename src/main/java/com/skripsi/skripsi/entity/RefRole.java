package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ref_role")
@Data
public class RefRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nama_role")
    private String namaRole;
    @Column(name = "keterangan")
    private String keterangan;
}
