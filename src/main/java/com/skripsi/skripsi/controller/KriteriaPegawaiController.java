package com.skripsi.skripsi.controller;

import com.skripsi.skripsi.service.IReferensiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/manajemen-project")
public class KriteriaPegawaiController {

    private final IReferensiService referensiService;

    @Autowired
    public KriteriaPegawaiController(IReferensiService referensiService) {
        this.referensiService = referensiService;
    }

    @GetMapping("/kriteria-pegawai")
    public String kriteriaPegawai(Model model) {
        model.addAttribute("listPegawai", referensiService.getPegawai());
        model.addAttribute("listSkill", referensiService.getSkillProgramming());
        model.addAttribute("listStack", referensiService.getStack());
        model.addAttribute("listPelatihan", referensiService.getRefPelatihan());
        return "/manajemen/kriteriapegawai";
    }

}
