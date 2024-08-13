package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbPegawai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TbPegawaiRepo extends JpaRepository<TbPegawai, Integer> {
    List<TbPegawai> findAllByUnitAndJabatan(String unit, String jabatan);

}
