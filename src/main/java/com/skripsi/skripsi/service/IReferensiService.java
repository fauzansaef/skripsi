package com.skripsi.skripsi.service;

import com.skripsi.skripsi.entity.*;

import java.util.List;

public interface IReferensiService {
    List<RefBahasaPemrograman> getBahasaPemrograman();
    List<RefDatabase> getDatabase();
    List<TbPegawai> getPegawai();
    List<RefSkillProgramming> getSkillProgramming();
    List<RefStack> getStack();
    List<RefPelatihan> getRefPelatihan();
}
