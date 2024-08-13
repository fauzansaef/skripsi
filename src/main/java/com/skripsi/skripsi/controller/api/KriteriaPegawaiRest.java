package com.skripsi.skripsi.controller.api;

import com.skripsi.skripsi.dto.KriteriaPegawaiDTO;
import com.skripsi.skripsi.entity.TbKriteriaPegawai;
import com.skripsi.skripsi.service.KriteriaPegawaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kriteria-pegawai")
public class KriteriaPegawaiRest {
    private final KriteriaPegawaiService kriteriaPegawaiService;

    @Autowired
    public KriteriaPegawaiRest(KriteriaPegawaiService kriteriaPegawaiService) {
        this.kriteriaPegawaiService = kriteriaPegawaiService;
    }

    @GetMapping
    public List<TbKriteriaPegawai> getKriteriaPegawai() {
        return kriteriaPegawaiService.getKriteriaPegawai();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getKriteriaPegawaiById(@PathVariable int id) {
        return ResponseEntity.ok(kriteriaPegawaiService.getKriteriaPegawaiById(id));
    }

    @PostMapping
    public ResponseEntity<?> simpanKriteriaPegawai(@RequestBody KriteriaPegawaiDTO kriteriaPegawaiDTO) {
        return ResponseEntity.ok(kriteriaPegawaiService.simpanKriteriaPegawai(kriteriaPegawaiDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateKriteriaPegawai(@PathVariable int id, @RequestBody KriteriaPegawaiDTO kriteriaPegawaiDTO) {
        return ResponseEntity.ok(kriteriaPegawaiService.updateKriteriaPegawai(id, kriteriaPegawaiDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> hapusKriteriaPegawai(@PathVariable int id) {
        return ResponseEntity.ok(kriteriaPegawaiService.hapusKriteriaPegawai(id));
    }
}
