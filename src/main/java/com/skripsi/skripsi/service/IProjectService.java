package com.skripsi.skripsi.service;

import com.skripsi.skripsi.dto.AplikasiDTO;
import com.skripsi.skripsi.entity.TbAplikasi;
import com.skripsi.skripsi.utility.MessageResponse;

import java.util.List;

public interface IProjectService {
    List<TbAplikasi> getAllProject();
    List<TbAplikasi> getAllProjectByProses(int proses);
    List<TbAplikasi> getAllProjectByProsesPegawai(int proses);

    MessageResponse getProjectById(int id);

    MessageResponse saveProject(AplikasiDTO aplikasiDTO);

    MessageResponse updateProject(int id, AplikasiDTO aplikasiDTO);

    MessageResponse deleteProject(int id);

    MessageResponse ajukanProject(int id);
    MessageResponse ajukanDeployment(int id);

    MessageResponse perhitunganSaw(int id);

    MessageResponse generateTimProject(List<Integer> idPegawais, int idAplikasi);

}
