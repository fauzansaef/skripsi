package com.skripsi.skripsi.service;

import com.skripsi.skripsi.dto.AplikasiDTO;
import com.skripsi.skripsi.entity.RefBahasaPemrograman;
import com.skripsi.skripsi.entity.TbAplikasi;
import com.skripsi.skripsi.entity.TrxBahasaPemrograman;
import com.skripsi.skripsi.entity.TrxJenisDatabase;
import com.skripsi.skripsi.repository.TbAplikasiRepo;
import com.skripsi.skripsi.repository.TrxBahasaPemrogramanRepo;
import com.skripsi.skripsi.repository.TrxJenisDatabaseRepo;
import com.skripsi.skripsi.utility.MessageResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService implements IProjectService {
    private final TbAplikasiRepo tbAplikasiRepo;
    private final TrxBahasaPemrogramanRepo trxBahasaPemrogramanRepo;
    private final TrxJenisDatabaseRepo trxJenisDatabaseRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public ProjectService(TbAplikasiRepo tbAplikasiRepo, TrxBahasaPemrogramanRepo trxBahasaPemrogramanRepo, TrxJenisDatabaseRepo trxJenisDatabaseRepo, ModelMapper modelMapper) {
        this.tbAplikasiRepo = tbAplikasiRepo;
        this.trxBahasaPemrogramanRepo = trxBahasaPemrogramanRepo;
        this.trxJenisDatabaseRepo = trxJenisDatabaseRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TbAplikasi> getAllProject() {
        return tbAplikasiRepo.findAll();
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
        TbAplikasi tbAplikasi = modelMapper.map(aplikasiDTO, TbAplikasi.class);
        tbAplikasi.setProses(0);//0:draft, 1:pengembangan, 2:testing, 3:deploy
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
}
