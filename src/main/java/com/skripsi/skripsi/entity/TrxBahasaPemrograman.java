package com.skripsi.skripsi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "trx_bahasa_pemrograman")
@Data
public class TrxBahasaPemrograman {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "id_aplikasi")
    private Integer idAplikasi;
    @Column(name = "id_bahasa_pemrograman")
    private Integer idBahasaPemrograman;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_aplikasi", insertable = false, updatable = false)
    private TbAplikasi aplikasi;
    @ManyToOne
    @JoinColumn(name = "id_bahasa_pemrograman", insertable = false, updatable = false)
    private RefBahasaPemrograman bahasaPemrograman;

}
