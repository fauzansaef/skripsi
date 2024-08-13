package com.skripsi.skripsi.service;

import com.skripsi.skripsi.auth.UserDetailsImpl;
import com.skripsi.skripsi.dto.AplikasiDTO;
import com.skripsi.skripsi.entity.*;
import com.skripsi.skripsi.repository.*;
import com.skripsi.skripsi.utility.SAWUtil;
import com.skripsi.skripsi.utility.MessageResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService implements IProjectService {
    private final TbAplikasiRepo tbAplikasiRepo;
    private final TrxBahasaPemrogramanRepo trxBahasaPemrogramanRepo;
    private final TrxJenisDatabaseRepo trxJenisDatabaseRepo;
    private final TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo;
    private final TbTimRepo tbTimRepo;
    private final ModelMapper modelMapper;
    private final SAWUtil SAWUtil;
    private final TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo;


    @Autowired
    public ProjectService(TbAplikasiRepo tbAplikasiRepo, TrxBahasaPemrogramanRepo trxBahasaPemrogramanRepo, TrxJenisDatabaseRepo trxJenisDatabaseRepo, TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo, TbTimRepo tbTimRepo, ModelMapper modelMapper, SAWUtil SAWUtil, TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo) {
        this.tbAplikasiRepo = tbAplikasiRepo;
        this.trxBahasaPemrogramanRepo = trxBahasaPemrogramanRepo;
        this.trxJenisDatabaseRepo = trxJenisDatabaseRepo;
        this.tbKriteriaPegawaiMatrixRepo = tbKriteriaPegawaiMatrixRepo;
        this.tbTimRepo = tbTimRepo;
        this.modelMapper = modelMapper;
        this.SAWUtil = SAWUtil;
        this.tbKriteriaPegawaiRepo = tbKriteriaPegawaiRepo;
    }

    @Override
    public List<TbAplikasi> getAllProject() {
        return tbAplikasiRepo.findAll();
    }

    @Override
    public List<TbAplikasi> getAllProjectByProses(int proses) {
        return tbAplikasiRepo.findAllByProses(proses);
    }

    @Override
    public List<TbAplikasi> getAllProjectByProsesPegawai(int proses) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        List<TbTim> tbTimList = tbTimRepo.findAllByIdPegawai(userDetails.getPegawai().getId());
        List<TbAplikasi> tbAplikasiList = new ArrayList<>();
        if (!tbTimList.isEmpty()) {
            tbTimList.forEach(tbTim -> {
                if(tbTim.getTbAplikasi().getProses()==proses)
                    tbAplikasiList.add(tbTim.getTbAplikasi());
            });
            return tbAplikasiList;
        }
        return tbAplikasiList;
    }

    @Override
    public MessageResponse getProjectById(int id) {
        if (!tbAplikasiRepo.existsById(id)) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        return new MessageResponse(1, "Success", tbAplikasiRepo.findById(id).get());
    }

    @Override
    public MessageResponse saveProject(AplikasiDTO aplikasiDTO) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        TbAplikasi tbAplikasi = modelMapper.map(aplikasiDTO, TbAplikasi.class);
        tbAplikasi.setProses(0);//0:draft, 1:pengembangan, 2:testing, 3:deploy
        tbAplikasi.setAnalis(userDetails.getPegawai().getId());
        tbAplikasiRepo.save(tbAplikasi);

        setListBahasaPemrogramanDanDatabase(aplikasiDTO, tbAplikasi);

        return new MessageResponse(1, "Project berhasil disimpan", tbAplikasi);
    }

    @Override
    public MessageResponse updateProject(int id, AplikasiDTO aplikasiDTO) {

        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);

        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }


        if (!trxBahasaPemrogramanRepo.findAllByIdAplikasi(id).isEmpty()) {
            trxBahasaPemrogramanRepo.findAllByIdAplikasi(id).forEach(trxBahasaPemrograman -> {
                trxBahasaPemrogramanRepo.deleteById(trxBahasaPemrograman.getId());
            });
        }

        if (!trxJenisDatabaseRepo.findAllByIdAplikasi(id).isEmpty()) {
            trxJenisDatabaseRepo.findAllByIdAplikasi(id).forEach(trxJenisDatabase -> {
                trxJenisDatabaseRepo.deleteById(trxJenisDatabase.getId());
            });
        }

        setListBahasaPemrogramanDanDatabase(aplikasiDTO, tbAplikasi);

        modelMapper.map(aplikasiDTO, tbAplikasi);
        tbAplikasiRepo.save(tbAplikasi);

        return new MessageResponse(1, "Project berhasil diupdate", tbAplikasi);
    }

    private void setListBahasaPemrogramanDanDatabase(AplikasiDTO aplikasiDTO, TbAplikasi tbAplikasi) {
        Arrays.stream(aplikasiDTO.getListBahasaPemrograman()).collect(Collectors.toList()).forEach(bahasaPemrograman -> {
            TrxBahasaPemrograman trxBahasaPemrograman = new TrxBahasaPemrograman();
            trxBahasaPemrograman.setIdAplikasi(tbAplikasi.getId());
            trxBahasaPemrograman.setIdBahasaPemrograman(bahasaPemrograman);
            trxBahasaPemrogramanRepo.save(trxBahasaPemrograman);
        });

        Arrays.stream(aplikasiDTO.getListJenisDatabase()).collect(Collectors.toList()).forEach(jenisDatabase -> {
            TrxJenisDatabase trxJenisDatabase = new TrxJenisDatabase();
            trxJenisDatabase.setIdAplikasi(tbAplikasi.getId());
            trxJenisDatabase.setIdDatabase(jenisDatabase);
            trxJenisDatabaseRepo.save(trxJenisDatabase);
        });
    }

    @Override
    public MessageResponse deleteProject(int id) {
        if (tbAplikasiRepo.existsById(id)) {
            tbAplikasiRepo.deleteById(id);
            return new MessageResponse(1, "Project berhasil dihapus", null);
        } else {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }
    }

    @Override
    public MessageResponse ajukanProject(int id) {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        if (tbAplikasi.getProses() > 0) {
            return new MessageResponse(0, "Project sudah diajukan", null);
        }

        tbAplikasi.setProses(1);
        tbAplikasiRepo.save(tbAplikasi);
        return new MessageResponse(1, "Project berhasil diajukan pengembangan", tbAplikasi);
    }

    @Override
    public MessageResponse ajukanDeployment(int id) {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        if (tbAplikasi.getProses() == 4) {
            return new MessageResponse(0, "Project sudah di deploy", null);
        }

        tbAplikasi.setProses(4);
        tbAplikasiRepo.save(tbAplikasi);

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        //update jumlah pengalaman project
        TbKriteriaPegawai tbKriteriaPegawai = tbKriteriaPegawaiRepo.findByIdPegawai(userDetails.getPegawai().getId()).orElse(null);
        if (tbKriteriaPegawai != null) {
            tbKriteriaPegawai.setJumlahPengalaman(tbKriteriaPegawai.getJumlahPengalaman() + 1);
            tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);
        }
        TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = tbKriteriaPegawaiMatrixRepo.findByIdPegawai(userDetails.getPegawai().getId()).orElse(null);
        if (tbKriteriaPegawaiMatrix != null) {
            //C3
            if (tbKriteriaPegawai.getJumlahPengalaman() <= 1) {
                tbKriteriaPegawaiMatrix.setPengalaman(1);
            } else if (tbKriteriaPegawai.getJumlahPengalaman() == 2) {
                tbKriteriaPegawaiMatrix.setPengalaman(2);
            } else if (tbKriteriaPegawai.getJumlahPengalaman() == 3) {
                tbKriteriaPegawaiMatrix.setPengalaman(3);
            } else if (tbKriteriaPegawai.getJumlahPengalaman() == 4) {
                tbKriteriaPegawaiMatrix.setPengalaman(4);
            } else {
                tbKriteriaPegawaiMatrix.setPengalaman(5);
            }
            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);

        }


        return new MessageResponse(1, "Project berhasil diajukan deployment", tbAplikasi);
    }

    @Override
    public MessageResponse perhitunganSaw(int id) {
        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(id).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }
        List<TbKriteriaPegawaiMatrix> tbKriteriaPegawaiMatrixList = tbKriteriaPegawaiMatrixRepo.findAll();
        return SAWUtil.metodeSAW(tbKriteriaPegawaiMatrixList);
    }

    @Override
    public MessageResponse generateTimProject(List<Integer> idPegawais, int idAplikasi) {

        TbAplikasi tbAplikasi = tbAplikasiRepo.findById(idAplikasi).orElse(null);
        if (tbAplikasi == null) {
            return new MessageResponse(0, "Project tidak ditemukan", null);
        }

        tbAplikasi.setProses(2);
        tbAplikasiRepo.save(tbAplikasi);

        idPegawais.forEach(idPegawai -> {
            TbTim tbTim = new TbTim();
            tbTim.setIdAplikasi(idAplikasi);
            tbTim.setIdPegawai(idPegawai);
            tbTim.setRoleProject("Programmer");
            tbTimRepo.save(tbTim);

            //update jumlah project ongoing
            TbKriteriaPegawai tbKriteriaPegawai = tbKriteriaPegawaiRepo.findByIdPegawai(idPegawai).orElse(null);
            if (tbKriteriaPegawai != null) {
                tbKriteriaPegawai.setJumlahProjectOngoing(tbKriteriaPegawai.getJumlahProjectOngoing() + 1);
                tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);
            }

            TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = tbKriteriaPegawaiMatrixRepo.findByIdPegawai(idPegawai).orElse(null);
            if (tbKriteriaPegawaiMatrix != null) {
                //C2
                switch (tbKriteriaPegawai.getJumlahProjectOngoing()) {
                    case 0:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(1);
                        break;
                    case 1:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(2);
                        break;
                    case 2:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(3);
                        break;
                    case 3:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(4);
                        break;
                    default:
                        tbKriteriaPegawaiMatrix.setProjectOngoing(5);
                        break;
                }
            }


        });


        return new MessageResponse(1, "Tim project berhasil dibuat", null);
    }
}
