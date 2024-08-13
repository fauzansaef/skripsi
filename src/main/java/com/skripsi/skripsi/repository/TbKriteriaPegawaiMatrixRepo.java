package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbKriteriaPegawaiMatrix;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TbKriteriaPegawaiMatrixRepo extends JpaRepository<TbKriteriaPegawaiMatrix, Integer> {
    Optional<TbKriteriaPegawaiMatrix> findByIdPegawai(Integer idPegawai);
}
