package com.skripsi.skripsi.service;

import com.skripsi.skripsi.entity.RefBahasaPemrograman;
import com.skripsi.skripsi.entity.RefDatabase;

import java.util.List;

public interface IReferensiService {
    List<RefBahasaPemrograman> getBahasaPemrograman();
    List<RefDatabase> getDatabase();
}
