package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TrxJenisDatabase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrxJenisDatabaseRepo extends JpaRepository<TrxJenisDatabase, Integer> {
    List<TrxJenisDatabase> findAllByIdAplikasi(int aplikasiId);
}
