package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class RefDatabase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nama")
    private String nama;
    @Column(name = "jenis")
    private Integer jenis;
    @Column(name = "keterangan")
    private String keterangan;
}
