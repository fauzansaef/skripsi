package com.skripsi.skripsi.controller.api;

import com.skripsi.skripsi.entity.RefBahasaPemrograman;
import com.skripsi.skripsi.entity.RefDatabase;
import com.skripsi.skripsi.service.ReferensiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/referensi")
public class ReferensiRest {
    private final ReferensiService referensiService;

    @Autowired
    public ReferensiRest(ReferensiService referensiService) {
        this.referensiService = referensiService;
    }

    @GetMapping("/bahasa-pemrograman")
    public List<RefBahasaPemrograman> getBahasaPemrograman() {
        return referensiService.getBahasaPemrograman();
    }

    @GetMapping("/database")
    public List<RefDatabase> getDatabase() {
        return referensiService.getDatabase();
    }
}
