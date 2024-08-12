package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "tb_pembobotan")
@Data
public class TbPembobotan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "kriteria")
    private String kriteria;
    @Column(name = "bobot")
    private double bobot;
}
