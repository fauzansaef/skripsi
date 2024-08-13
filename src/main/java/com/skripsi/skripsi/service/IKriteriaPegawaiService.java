package com.skripsi.skripsi.service;

import com.skripsi.skripsi.dto.KriteriaPegawaiDTO;
import com.skripsi.skripsi.entity.TbKriteriaPegawai;
import com.skripsi.skripsi.utility.MessageResponse;

import java.util.List;

public interface IKriteriaPegawaiService {
    List<TbKriteriaPegawai> getKriteriaPegawai();
    MessageResponse getKriteriaPegawaiById(int id);
    MessageResponse simpanKriteriaPegawai(KriteriaPegawaiDTO kriteriaPegawaiDTO);
    MessageResponse updateKriteriaPegawai(int id, KriteriaPegawaiDTO kriteriaPegawaiDTO);
    MessageResponse hapusKriteriaPegawai(int id);


}
