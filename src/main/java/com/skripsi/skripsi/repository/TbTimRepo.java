package com.skripsi.skripsi.repository;

import com.skripsi.skripsi.entity.TbTim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TbTimRepo extends JpaRepository<TbTim, Integer> {

    @Query(value = "SELECT COUNT(*) FROM tb_tim a inner join tb_pegawai b on a.id_pegawai = b.id " +
            "inner join tb_aplikasi c on a.id_aplikasi = c.id WHERE a.id_pegawai = ?1 AND c.proses ", nativeQuery = true)
    Integer jumlahProjectByStatusProses(Integer idPegawai, Integer proses);

    List<TbTim> findAllByIdPegawai(Integer idPegawai);

}
