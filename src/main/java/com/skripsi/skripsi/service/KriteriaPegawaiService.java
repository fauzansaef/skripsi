package com.skripsi.skripsi.service;

import com.skripsi.skripsi.dto.KriteriaPegawaiDTO;
import com.skripsi.skripsi.entity.TbKriteriaPegawai;
import com.skripsi.skripsi.entity.TbKriteriaPegawaiMatrix;
import com.skripsi.skripsi.repository.TbKriteriaPegawaiMatrixRepo;
import com.skripsi.skripsi.repository.TbKriteriaPegawaiRepo;
import com.skripsi.skripsi.repository.TbTimRepo;
import com.skripsi.skripsi.utility.MessageResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class KriteriaPegawaiService implements IKriteriaPegawaiService {

    private final TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo;
    private final TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo;
    private final TbTimRepo tbTimRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public KriteriaPegawaiService(TbKriteriaPegawaiRepo tbKriteriaPegawaiRepo, TbKriteriaPegawaiMatrixRepo tbKriteriaPegawaiMatrixRepo, TbTimRepo tbTimRepo, ModelMapper modelMapper) {
        this.tbKriteriaPegawaiRepo = tbKriteriaPegawaiRepo;
        this.tbKriteriaPegawaiMatrixRepo = tbKriteriaPegawaiMatrixRepo;
        this.tbTimRepo = tbTimRepo;
        this.modelMapper = modelMapper;
    }


    @Override
    public List<TbKriteriaPegawai> getKriteriaPegawai() {
        return tbKriteriaPegawaiRepo.findAll();
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

        TbKriteriaPegawai tbKriteriaPegawai = modelMapper.map(kriteriaPegawaiDTO, TbKriteriaPegawai.class);
        tbKriteriaPegawai.setJumlahPengalaman(projectDeploy);
        tbKriteriaPegawai.setJumlahProjectOngoing(projectOngoing);
        tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);

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
            if (tbKriteriaPegawai.getJumlahPelatihan() <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 2) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 4) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            }

            //C5
            if (tbKriteriaPegawai.getPenguasaanStack() <= 1) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 2) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 3) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 4) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else {
                tbKriteriaPegawaiMatrix.setStack(5);
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
            if (tbKriteriaPegawai.getJumlahPelatihan() <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 2) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 4) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            }

            //C5
            if (tbKriteriaPegawai.getPenguasaanStack() <= 1) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 2) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 3) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 4) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else {
                tbKriteriaPegawaiMatrix.setStack(5);
            }

            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        }

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
        modelMapper.map(kriteriaPegawaiDTO, tbKriteriaPegawai);
        tbKriteriaPegawai.setJumlahPengalaman(projectDeploy);
        tbKriteriaPegawai.setJumlahProjectOngoing(projectOngoing);
        tbKriteriaPegawaiRepo.save(tbKriteriaPegawai);

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
            if (tbKriteriaPegawai.getJumlahPelatihan() <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 2) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 4) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            }

            //C5
            if (tbKriteriaPegawai.getPenguasaanStack() <= 1) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 2) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 3) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 4) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else {
                tbKriteriaPegawaiMatrix.setStack(5);
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
            if (tbKriteriaPegawai.getJumlahPelatihan() <= 1) {
                tbKriteriaPegawaiMatrix.setPelatihan(1);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 2) {
                tbKriteriaPegawaiMatrix.setPelatihan(2);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 3) {
                tbKriteriaPegawaiMatrix.setPelatihan(3);
            } else if (tbKriteriaPegawai.getJumlahPelatihan() == 4) {
                tbKriteriaPegawaiMatrix.setPelatihan(4);
            } else {
                tbKriteriaPegawaiMatrix.setPelatihan(5);
            }

            //C5
            if (tbKriteriaPegawai.getPenguasaanStack() <= 1) {
                tbKriteriaPegawaiMatrix.setStack(1);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 2) {
                tbKriteriaPegawaiMatrix.setStack(2);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 3) {
                tbKriteriaPegawaiMatrix.setStack(3);
            } else if (tbKriteriaPegawai.getPenguasaanStack() == 4) {
                tbKriteriaPegawaiMatrix.setStack(4);
            } else {
                tbKriteriaPegawaiMatrix.setStack(5);
            }

            tbKriteriaPegawaiMatrixRepo.save(tbKriteriaPegawaiMatrix);
        }

        return new MessageResponse(1, "Kriteria Pegawai berhasil disimpan", tbKriteriaPegawai);
    }

    @Override
    public MessageResponse hapusKriteriaPegawai(int id) {
        if(!tbKriteriaPegawaiRepo.existsById(id)){
            return new MessageResponse(0, "Kriteria Pegawai tidak ditemukan", null);
        }else {
            tbKriteriaPegawaiRepo.deleteById(id);
            return new MessageResponse(1, "Kriteria Pegawai berhasil dihapus", null);
        }
    }
}
