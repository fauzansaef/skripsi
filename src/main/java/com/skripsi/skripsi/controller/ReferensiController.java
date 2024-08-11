package com.skripsi.skripsi.controller;

import com.skripsi.skripsi.service.ReferensiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/referensi")
public class ReferensiController {
    private final ReferensiService referensiService;

    @Autowired
    public ReferensiController(ReferensiService referensiService) {
        this.referensiService = referensiService;
    }




}
