package com.skripsi.skripsi.service;

import com.skripsi.skripsi.dto.KriteriaPegawaiDTO;
import com.skripsi.skripsi.dto.TbKriteriaPegawaiDTO;
import com.skripsi.skripsi.entity.RefPelatihan;
import com.skripsi.skripsi.entity.RefStack;
import com.skripsi.skripsi.entity.TbKriteriaPegawai;
import com.skripsi.skripsi.entity.TbKriteriaPegawaiMatrix;
import com.skripsi.skripsi.repository.*;
import com.skripsi.skripsi.utility.MessageResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class KriteriaPegawaiService implements IKriteriaPegawaiService {

    private final TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo;
    private final TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo;
    private final TbTimRepo tbTimRepo;
    private final RefPelatihanRepo refPelatihanRepo;
    private final RefStackRepo refStackRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public KriteriaPegawaiService(TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo, TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo, TbTimRepo tbTimRepo, RefPelatihanRepo refPelatihanRepo, RefStackRepo refStackRepo, ModelMapper modelMapper) {
        this.tbKriteriaPegawaiRepo = tbKriteriaPegawaiRepo;
        this.tbKriteriaPegawaiMatrixRepo = tbKriteriaPegawaiMatrixRepo;
        this.tbTimRepo = tbTimRepo;
        this.refPelatihanRepo = refPelatihanRepo;
        this.refStackRepo = refStackRepo;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<TbKriteriaPegawaiDTO> getKriteriaPegawai() {
        List<TbKriteriaPegawaiDTO> listTbKriteriaPegawaiDTO = new ArrayList<>();
        List<TbKriteriaPegawai> tbKriteriaPegawai = tbKriteriaPegawaiRepo.findAll();

        tbKriteriaPegawai.forEach(kriteriaPegawai -> {
            TbKriteriaPegawaiDTO tbKriteriaPegawaiDTO = new TbKriteriaPegawaiDTO();
            tbKriteriaPegawaiDTO.setId(kriteriaPegawai.getId());
            tbKriteriaPegawaiDTO.setNamaPegawai(kriteriaPegawai.getTbPegawai().getNama());
            tbKriteriaPegawaiDTO.setLvlKemampuanCoding(kriteriaPegawai.getRefSkillProgramming().getNama());

            String strArrPelatihan = kriteriaPegawai.getJumlahPelatihan();
            strArrPelatihan = strArrPelatihan.substring(1, strArrPelatihan.length() - 1);
            String[] strArrayPelatihan = strArrPelatihan.split(", ");
            int[] intIdPelatihan = new int[strArrayPelatihan.length];

            for (int i = 0; i < strArrayPelatihan.length; i++) {
                intIdPelatihan[i] = Integer.parseInt(strArrayPelatihan[i]);
            }

            List<String> listPelatihan = new ArrayList<>();
            for (int i = 0; i < intIdPelatihan.length; i++) {
                RefPelatihan refPelatihan = refPelatihanRepo.findById(intIdPelatihan[i]).get();
                listPelatihan.add(refPelatihan.getNama());
                tbKriteriaPegawaiDTO.setListPelatihan(listPelatihan);
            }

            tbKriteriaPegawaiDTO.setJumlahPengalaman(kriteriaPegawai.getJumlahPengalaman());
            tbKriteriaPegawaiDTO.setJumlahProjectOngoing(kriteriaPegawai.getJumlahProjectOngoing());

            String strArrPenguasaanStack = kriteriaPegawai.getPenguasaanStack();
            strArrPenguasaanStack = strArrPenguasaanStack.substring(1, strArrPenguasaanStack.length() - 1);
            String[] strArray = strArrPenguasaanStack.split(", ");
            int[] intIdStack = new int[strArray.length];

            List<String> listStack = new ArrayList<>();
            for (int i = 0; i < strArray.length; i++) {
                intIdStack[i] = Integer.parseInt(strArray[i]);
            }

            for (int i = 0; i < intIdStack.length; i++) {
                RefStack refStack = refStackRepo.findById(intIdStack[i]).get();
                listStack.add(refStack.getNama());
                tbKriteriaPegawaiDTO.setListStack(listStack);
            }


            listTbKriteriaPegawaiDTO.add(tbKriteriaPegawaiDTO);
        });

        return listTbKriteriaPegawaiDTO;
    }

    @Override
    public MessageResponse getKriteriaPegawaiById(int id) {

        if (!tbKriteriaPegawaiRepo.existsById(id)) {
            return new MessageResponse(0, "kriteria pegawai tidak ditemukan", null);
        }

        return new MessageResponse(1, "Success", tbKriteriaPegawaiRepo.findById(id).get());
    }

    @Override
    public MessageResponse simpanKriteriaPegawai(KriteriaPegawaiDTO kriteriaPegawaiDTO) {
        Integer projectDeploy = tbTimRepo.jumlahProjectByStatusProses(kriteriaPegawaiDTO.getIdPegawai(), 4);
        Integer projectOngoing = tbTimRepo.jumlahProjectByStatusProses(kriteriaPegawaiDTO.getIdPegawai(), 2);

        TbKriteriaPegawai tbKriteriaPegawai = new TbKriteriaPegawai();
        tbKriteriaPegawai.setIdPegawai(kriteriaPegawaiDTO.getIdPegawai());
        tbKriteriaPegawai.setKemampuanCoding(kriteriaPegawaiDTO.getKemampuanCoding());
        tbKriteriaPegawai.setJumlahPengalaman(projectDeploy);
        tbKriteriaPegawai.setJumlahProjectOngoing(projectOngoing);
        tbKriteriaPegawai.setJumlahPelatihan(Arrays.toString(kriteriaPegawaiDTO.getJumlahPelatihan()));
        tbKriteriaPegawai.setPenguasaanStack(Arrays.toString(kriteriaPegawaiDTO.getPenguasaanStack()));


        if (tbKriteriaPegawaiMatrixRepo.findByIdPegawai(kriteriaPegawaiDTO.getIdPegawai()).isPresent()) {
            TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = tbKriteriaPegawaiMatrixRepo.findByIdPegawai(kriteriaPegawaiDTO.getIdPegawai()).get();

            //C1
            switch (tbKriteriaPegawai.getKemampuanCoding()) {
                case 1:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(1);
                    break;
                case 2:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(2);
                    break;
                case 3:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(3);
                    break;
                case 4:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(4);
                    break;
                case 5:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(5);
                    break;
            }

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


            //C4
            String strArrPelatihan = tbKriteriaPegawai.getJumlahPelatihan();
            strArrPelatihan = strArrPelatihan.substring(1, strArrPelatihan.length() - 1); // Remove the brackets
            String[] strArrayPelatihan = strArrPelatihan.split(", "); // Split the string into an array of strings
            int[] intIdPelatihan = new int[strArrayPelatihan.length]; // Create an int array of the same length

            // Parse the strings into integers and store them in the int array
            for (int i = 0; i < strArrayPelatihan.length; i++) {
                intIdPelatihan[i] = Integer.parseInt(strArrayPelatihan[i]);
            }

            if (intIdPelatihan.length <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (intIdPelatihan.length > 1 && intIdPelatihan.length <= 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (intIdPelatihan.length > 3 && intIdPelatihan.length <= 5) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (intIdPelatihan.length > 5 && intIdPelatihan.length <= 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else if (intIdPelatihan.length > 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            } else {
                return new MessageResponse(0, "Pilihan pelatihan tidak sesuai", null);
            }



            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        } else {
            TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = new TbKriteriaPegawaiMatrix();
            tbKriteriaPegawaiMatrix.setIdPegawai(kriteriaPegawaiDTO.getIdPegawai());

            //C1
            switch (tbKriteriaPegawai.getKemampuanCoding()) {
                case 1:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(1);
                    break;
                case 2:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(2);
                    break;
                case 3:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(3);
                    break;
                case 4:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(4);
                    break;
                case 5:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(5);
                    break;
            }

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

            //C4
            String strArrPelatihan = tbKriteriaPegawai.getJumlahPelatihan();
            strArrPelatihan = strArrPelatihan.substring(1, strArrPelatihan.length() - 1); // Remove the brackets
            String[] strArrayPelatihan = strArrPelatihan.split(", "); // Split the string into an array of strings
            int[] intIdPelatihan = new int[strArrayPelatihan.length]; // Create an int array of the same length

            // Parse the strings into integers and store them in the int array
            for (int i = 0; i < strArrayPelatihan.length; i++) {
                intIdPelatihan[i] = Integer.parseInt(strArrayPelatihan[i]);
            }

            if (intIdPelatihan.length <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (intIdPelatihan.length > 1 && intIdPelatihan.length <= 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (intIdPelatihan.length > 3 && intIdPelatihan.length <= 5) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (intIdPelatihan.length > 5 && intIdPelatihan.length <= 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else if (intIdPelatihan.length > 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            } else {
                return new MessageResponse(0, "Pilihan pelatihan tidak sesuai", null);
            }



            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        }

        tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);

        return new MessageResponse(1, "Kriteria Pegawai berhasil disimpan", tbKriteriaPegawai);
    }

    @Override
    public MessageResponse updateKriteriaPegawai(int id, KriteriaPegawaiDTO kriteriaPegawaiDTO) {
        Integer projectDeploy = tbTimRepo.jumlahProjectByStatusProses(kriteriaPegawaiDTO.getIdPegawai(), 4);
        Integer projectOngoing = tbTimRepo.jumlahProjectByStatusProses(kriteriaPegawaiDTO.getIdPegawai(), 2);

        TbKriteriaPegawai tbKriteriaPegawai = tbKriteriaPegawaiRepo.findById(id).orElse(null);
        if (tbKriteriaPegawai == null) {
            return new MessageResponse(0, "Kriteria Pegawai tidak ditemukan", null);
        }
        tbKriteriaPegawai.setIdPegawai(kriteriaPegawaiDTO.getIdPegawai());
        tbKriteriaPegawai.setKemampuanCoding(kriteriaPegawaiDTO.getKemampuanCoding());
        tbKriteriaPegawai.setJumlahPengalaman(projectDeploy);
        tbKriteriaPegawai.setJumlahProjectOngoing(projectOngoing);
        tbKriteriaPegawai.setJumlahPelatihan(Arrays.toString(kriteriaPegawaiDTO.getJumlahPelatihan()));
        tbKriteriaPegawai.setPenguasaanStack(Arrays.toString(kriteriaPegawaiDTO.getPenguasaanStack()));


        if (tbKriteriaPegawaiMatrixRepo.findByIdPegawai(kriteriaPegawaiDTO.getIdPegawai()).isPresent()) {
            TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = tbKriteriaPegawaiMatrixRepo.findByIdPegawai(kriteriaPegawaiDTO.getIdPegawai()).get();

            //C1
            switch (tbKriteriaPegawai.getKemampuanCoding()) {
                case 1:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(1);
                    break;
                case 2:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(2);
                    break;
                case 3:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(3);
                    break;
                case 4:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(4);
                    break;
                case 5:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(5);
                    break;
            }

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


            //C4
            String strArrPelatihan = tbKriteriaPegawai.getJumlahPelatihan();
            strArrPelatihan = strArrPelatihan.substring(1, strArrPelatihan.length() - 1); // Remove the brackets
            String[] strArrayPelatihan = strArrPelatihan.split(", "); // Split the string into an array of strings
            int[] intIdPelatihan = new int[strArrayPelatihan.length]; // Create an int array of the same length

            // Parse the strings into integers and store them in the int array
            for (int i = 0; i < strArrayPelatihan.length; i++) {
                intIdPelatihan[i] = Integer.parseInt(strArrayPelatihan[i]);
            }

            if (intIdPelatihan.length <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (intIdPelatihan.length > 1 && intIdPelatihan.length <= 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (intIdPelatihan.length > 3 && intIdPelatihan.length <= 5) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (intIdPelatihan.length > 5 && intIdPelatihan.length <= 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else if (intIdPelatihan.length > 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            } else {
                return new MessageResponse(0, "Pilihan pelatihan tidak sesuai", null);
            }


            //C5
            String strArrPenguasaanStack = tbKriteriaPegawai.getPenguasaanStack();
            strArrPenguasaanStack = strArrPenguasaanStack.substring(1, strArrPenguasaanStack.length() - 1); // Remove the brackets
            String[] strArray = strArrPenguasaanStack.split(", "); // Split the string into an array of strings
            int[] intIdStack = new int[strArray.length]; // Create an int array of the same length

            // Parse the strings into integers and store them in the int array
            for (int i = 0; i < strArray.length; i++) {
                intIdStack[i] = Integer.parseInt(strArray[i]);
            }

            int[] jenisStack = new int[intIdStack.length];

            for (int i = 0; i < intIdStack.length; i++) {
                RefStack refStack = refStackRepo.findById(intIdStack[i]).get();
                jenisStack[i] = refStack.getJenis();
            }

            int count1 = (int) Arrays.stream(jenisStack)
                    .filter(value -> value == 1)
                    .count();

            int count2 = (int) Arrays.stream(jenisStack)
                    .filter(value -> value == 2)
                    .count();

            int count3 = (int) Arrays.stream(jenisStack)
                    .filter(value -> value == 3)
                    .count();

            if (count1 == 1 && count2 == 0 && count3 == 0) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (count1 >= 2 && count2 == 0 && count3 == 0) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (count1 >= 1 && count2 >= 1 && count3 == 0) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (count1 >= 1 && count2 >= 1 && count3 == 1) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else if (count1 >= 1 && count2 >= 1 && count3 >= 1) {
                tbKriteriaPegawaiMatrix.setStack(5);
            } else if (count1 >= 1 && count2 == 0 && count3 >= 1) {
                return new MessageResponse(0, "Wajib memilih minimal 1 stack programming atau pilihan stack tidak sesuai", null);
            } else {
                return new MessageResponse(0, "Pilihan stack tidak sesuai", null);
            }
            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        } else {
            TbKriteriaPegawaiMatrix tbKriteriaPegawaiMatrix = new TbKriteriaPegawaiMatrix();
            tbKriteriaPegawaiMatrix.setIdPegawai(kriteriaPegawaiDTO.getIdPegawai());

            //C1
            switch (tbKriteriaPegawai.getKemampuanCoding()) {
                case 1:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(1);
                    break;
                case 2:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(2);
                    break;
                case 3:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(3);
                    break;
                case 4:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(4);
                    break;
                case 5:
                    tbKriteriaPegawaiMatrix.setKemampuanCoding(5);
                    break;
            }

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

            //C4
            String strArrPelatihan = tbKriteriaPegawai.getJumlahPelatihan();
            strArrPelatihan = strArrPelatihan.substring(1, strArrPelatihan.length() - 1); // Remove the brackets
            String[] strArrayPelatihan = strArrPelatihan.split(", "); // Split the string into an array of strings
            int[] intIdPelatihan = new int[strArrayPelatihan.length]; // Create an int array of the same length

            // Parse the strings into integers and store them in the int array
            for (int i = 0; i < strArrayPelatihan.length; i++) {
                intIdPelatihan[i] = Integer.parseInt(strArrayPelatihan[i]);
            }

            if (intIdPelatihan.length <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (intIdPelatihan.length > 1 && intIdPelatihan.length <= 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (intIdPelatihan.length > 3 && intIdPelatihan.length <= 5) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (intIdPelatihan.length > 5 && intIdPelatihan.length <= 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else if (intIdPelatihan.length > 7) {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            } else {
                return new MessageResponse(0, "Pilihan pelatihan tidak sesuai", null);
            }


            //C5
            String strArrPenguasaanStack = tbKriteriaPegawai.getPenguasaanStack();
            strArrPenguasaanStack = strArrPenguasaanStack.substring(1, strArrPenguasaanStack.length() - 1); // Remove the brackets
            String[] strArray = strArrPenguasaanStack.split(", "); // Split the string into an array of strings
            int[] intIdStack = new int[strArray.length]; // Create an int array of the same length

            // Parse the strings into integers and store them in the int array
            for (int i = 0; i < strArray.length; i++) {
                intIdStack[i] = Integer.parseInt(strArray[i]);
            }

            int[] jenisStack = new int[intIdStack.length];

            for (int i = 0; i < intIdStack.length; i++) {
                RefStack refStack = refStackRepo.findById(intIdStack[i]).get();
                jenisStack[i] = refStack.getJenis();
            }

            int count1 = (int) Arrays.stream(jenisStack)
                    .filter(value -> value == 1)
                    .count();

            int count2 = (int) Arrays.stream(jenisStack)
                    .filter(value -> value == 2)
                    .count();

            int count3 = (int) Arrays.stream(jenisStack)
                    .filter(value -> value == 3)
                    .count();

            if (count1 == 1 && count2 == 0 && count3 == 0) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (count1 >= 2 && count2 == 0 && count3 == 0) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (count1 >= 1 && count2 >= 1 && count3 == 0) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (count1 >= 1 && count2 >= 1 && count3 == 1) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else if (count1 >= 1 && count2 >= 1 && count3 >= 1) {
                tbKriteriaPegawaiMatrix.setStack(5);
            } else if (count1 >= 1 && count2 == 0 && count3 >= 1) {
                return new MessageResponse(0, "Wajib memilih minimal 1 stack programming atau pilihan stack tidak sesuai", null);
            } else {
                return new MessageResponse(0, "Pilihan stack tidak sesuai", null);
            }
            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        }

        tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);

        return new MessageResponse(1, "Kriteria Pegawai berhasil diupdate", tbKriteriaPegawai);
    }

    @Override
    public MessageResponse hapusKriteriaPegawai(int id) {
        TbKriteriaPegawai tbKriteriaPegawai = (TbKriteriaPegawai) getKriteriaPegawaiById(id).getData();

        if (!tbKriteriaPegawaiRepo.existsById(id)) {
            return new MessageResponse(0, "Kriteria Pegawai tidak ditemukan", null);
        } else {
            tbKriteriaPegawaiRepo.deleteById(id);

            if (tbKriteriaPegawaiMatrixRepo.findByIdPegawai(tbKriteriaPegawai.getIdPegawai()).isPresent()) {
                tbKriteriaPegawaiMatrixRepo.deleteById(tbKriteriaPegawaiMatrixRepo.findByIdPegawai(tbKriteriaPegawai.getIdPegawai()).get().getId());
            } else {
                return new MessageResponse(0, "Kriteria Pegawai Matrix tidak ditemukan", null);
            }

            return new MessageResponse(1, "Kriteria Pegawai berhasil dihapus", null);
        }
    }
}
