package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbAplikasi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TbAplikasiRepo extends JpaRepository<TbAplikasi, Integer> {
    List<TbAplikasi> findAllByProses(int proses);
}
