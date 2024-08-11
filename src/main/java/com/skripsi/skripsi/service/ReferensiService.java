package com.skripsi.skripsi.service;

import com.skripsi.skripsi.entity.RefBahasaPemrograman;
import com.skripsi.skripsi.entity.RefDatabase;
import com.skripsi.skripsi.repository.RefBahasaPemrogramanRepo;
import com.skripsi.skripsi.repository.RefDatabaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReferensiService implements IReferensiService{
    private final RefBahasaPemrogramanRepo refBahasaPemrogramanRepo;
    private final RefDatabaseRepo refDatabaseRepo;

    @Autowired
    public ReferensiService(RefBahasaPemrogramanRepo refBahasaPemrogramanRepo, RefDatabaseRepo refDatabaseRepo) {
        this.refBahasaPemrogramanRepo = refBahasaPemrogramanRepo;
        this.refDatabaseRepo = refDatabaseRepo;
    }

    @Override
    public List<RefBahasaPemrograman> getBahasaPemrograman() {
        return refBahasaPemrogramanRepo.findAll();
    }

    @Override
    public List<RefDatabase> getDatabase() {
        return refDatabaseRepo.findAll();
    }
}
