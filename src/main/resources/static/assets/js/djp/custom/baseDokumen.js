function hapusDokumenLainnya(id) {
    swal.fire({
        title: "Hapus Dokumen Lainnya?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: 'Tidak',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: 'btn btn-light'
        }
    }).then(function (e) {
        if(e.isConfirmed === true){
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/service-pengembangan/dokumen/delete-dokumen-lainnya",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id},
                success: function (data) {
                    if(data === "1"){
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelDokumen').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function hapusFile(id, type) {
    var jenis;
    if (type == 3){
        jenis = "Project Charter";
    } else if (type == 4){
        jenis = "Project Manajemen Plan";
    } else if (type == 5){
        jenis = "Dokumen Pengajuan Pengembangan";
    } else if (type == 6){
        jenis = "Dokumen Kajian";
    } else if (type == 7){
        jenis = "URS";
    } else if (type == 8){
        jenis = "SRS";
    } else if (type == 9){
        jenis = "SDD";
    } else if (type == 10){
        jenis = "TOK";
    } else if (type == 11){
        jenis = "UAT";
    } else if (type == 12){
        jenis = "Nd Deploy";
    } else if (type == 13){
        jenis = "Permohonan TOK";
    } else if (type == 14){
        jenis = "Permohonan UAT";
    } else if (type == 15){
        jenis = "Nd Rollout";
    }
    swal.fire({
        title: "Hapus File "+jenis+" ?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: 'Tidak',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: 'btn btn-light'
        }
    }).then(function (e) {
        if (e.isConfirmed === true) {
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/service-pengembangan/versioning/delete-file",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id, type: type},
                success: function (data) {
                    if (data === "1") {
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            if (type == 3) {
                                $('#divDetailUploadProjectCharter').attr("style", "display: none !important");
                                $('#divUploadProjectCharter').attr("style", "display: block");
                            } else if (type == 4) {
                                $('#divDetailUploadProjectManajemenPlan').attr("style", "display: none !important");
                                $('#divUploadProjectManajemenPlan').attr("style", "display: block");
                            } else if (type == 5) {
                                $('#divDetailDokumenPengajuanPengembangan').attr("style", "display: none !important");
                                $('#divUploadDokumenPengajuanPengembangan').attr("style", "display: block");
                            } else if (type == 6) {
                                $('#divDetailDokumenKajian').attr("style", "display: none !important");
                                $('#divUploadDokumenKajian').attr("style", "display: block");
                            }  else if (type == 7) {
                                $('#divDetailUploadUrs').attr("style", "display: none !important");
                                $('#divUploadUrs').attr("style", "display: block");
                            } else if (type == 8) {
                                $('#divDetailUploadSrs').attr("style", "display: none !important");
                                $('#divUploadSrs').attr("style", "display: block");
                            } else if (type == 9) {
                                $('#divDetailUploadSdd').attr("style", "display: none !important");
                                $('#divUploadSdd').attr("style", "display: block");
                            } else if (type == 10) {
                                $('#divDetailUploadTok').attr("style", "display: none !important");
                                $('#divUploadTok').attr("style", "display: block");
                            } else if (type == 11) {
                                $('#divDetailUploadUat').attr("style", "display: none !important");
                                $('#divUploadUat').attr("style", "display: block");
                            } else if (type == 12) {
                                $('#divDetailUploadNdDeploy').attr("style", "display: none !important");
                                $('#divUploadNdDeploy').attr("style", "display: block");
                            } else if (type == 13) {
                                $('#divDetailUploadPermohonanTok').attr("style", "display: none !important");
                                $('#divUploadPermohonanTok').attr("style", "display: block");
                            } else if (type == 14) {
                                $('#divDetailUploadPermohonanUat').attr("style", "display: none !important");
                                $('#divUploadPermohonanUat').attr("style", "display: block");
                            } else if (type == 15) {
                                $('#divDetailUploadNdRollout').attr("style", "display: none !important");
                                $('#divUploadNdRollout').attr("style", "display: block");
                            }
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function goToListSurat(id) {
    window.location.href = window.location.origin + "/monitoring/aplikasi/list-surat-by-monitoring/"+id;
}