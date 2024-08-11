package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TrxBahasaPemrograman;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrxBahasaPemrogramanRepo extends JpaRepository<TrxBahasaPemrograman, Integer> {
    List<TrxBahasaPemrograman> findAllByIdAplikasi(int aplikasiId);
}
