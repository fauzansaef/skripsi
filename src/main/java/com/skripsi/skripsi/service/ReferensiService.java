package com.skripsi.skripsi.service;

import com.skripsi.skripsi.auth.UserDetailsImpl;
import com.skripsi.skripsi.entity.*;
import com.skripsi.skripsi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReferensiService implements IReferensiService{
    private final RefBahasaPemrogramanRepo refBahasaPemrogramanRepo;
    private final RefDatabaseRepo refDatabaseRepo;
    private final TbPegawaiRepo tbPegawaiRepo;
    private final RefSkillProgrammingRepo refSkillProgrammingRepo;
    private final RefStackRepo refStackRepo;
    private final RefPelatihanRepo refPelatihanRepo;

    @Autowired
    public ReferensiService(RefBahasaPemrogramanRepo refBahasaPemrogramanRepo, RefDatabaseRepo refDatabaseRepo, TbPegawaiRepo tbPegawaiRepo, RefSkillProgrammingRepo refSkillProgrammingRepo, RefStackRepo refStackRepo, RefPelatihanRepo refPelatihanRepo) {
        this.refBahasaPemrogramanRepo = refBahasaPemrogramanRepo;
        this.refDatabaseRepo = refDatabaseRepo;
        this.tbPegawaiRepo = tbPegawaiRepo;
        this.refSkillProgrammingRepo = refSkillProgrammingRepo;
        this.refStackRepo = refStackRepo;
        this.refPelatihanRepo = refPelatihanRepo;
    }

    @Override
    public List<RefBahasaPemrograman> getBahasaPemrograman() {
        return refBahasaPemrogramanRepo.findAll();
    }

    @Override
    public List<RefDatabase> getDatabase() {
        return refDatabaseRepo.findAll();
    }

    @Override
    public List<TbPegawai> getListProgrammer() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return tbPegawaiRepo.findAllByUnitAndJabatan(userDetails.getPegawai().getUnit(),"Programmer");
    }

    @Override
    public List<RefSkillProgramming> getSkillProgramming() {
        return refSkillProgrammingRepo.findAll();
    }

    @Override
    public List<RefStack> getStack() {
        return refStackRepo.findAll();
    }

    @Override
    public List<RefPelatihan> getRefPelatihan() {
        return refPelatihanRepo.findAll();
    }
}
