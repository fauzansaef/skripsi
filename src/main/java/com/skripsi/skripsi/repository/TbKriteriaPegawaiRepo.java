package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbKriteriaPegawai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TbKriteriaPegawaiRepo extends JpaRepository<TbKriteriaPegawai, Integer> {
    Optional<TbKriteriaPegawai> findByIdPegawai(int idPegawai);
}
