package com.skripsi.skripsi.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ref_skill_programming")
@Data
public class RefSkillProgramming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nama")
    private String nama;
    @Column(name = "keterangan")
    private String keterangan;
    @Column(name = "bobot")
    private Integer bobot;

}
