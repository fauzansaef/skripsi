package com.skripsi.skripsi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "trx_jenis_database")
@Data
public class TrxJenisDatabase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "id_aplikasi")
    private Integer idAplikasi;
    @Column(name = "id_database")
    private Integer idDatabase;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_aplikasi", insertable = false, updatable = false)
    private TbAplikasi aplikasi;
    @ManyToOne
    @JoinColumn(name = "id_database", insertable = false, updatable = false)
    private RefDatabase jenisDatabase;
}
