package com.skripsi.skripsi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_user")
@Data
public class TbUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "id_pegawai")
    private Integer idPegawai;
    @Column(name = "username")
    private String username;
    @JsonIgnore
    @Column(name = "password")
    private String password;
    @Column(name = "role")
    private Integer role;
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    @Column(name = "active")
    private Integer active;
    @ManyToOne
    @JoinColumn(name = "role", insertable = false, updatable = false)
    private RefRole refRole;
    @ManyToOne
    @JoinColumn(name = "id_pegawai", insertable = false, updatable = false)
    private TbPegawai pegawai;

}
