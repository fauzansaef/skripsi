function goToDaftarVersioning(id) {
    window.location.href = window.location.origin + "/pengembangan/versioning/list/"+id;
}

function goToTambahVersioning(id) {
    window.location.href = window.location.origin + "/pengembangan/versioning/tambah/"+id;
}

function goToEditVersion(id) {
    window.location.href = window.location.origin + "/pengembangan/versioning/edit/"+id;
}

function hapusVersion(id) {
    swal.fire({
        title: "Hapus Version?",
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
                url: "/service-pengembangan/versioning/delete-versioning",
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
                            $('#tabelVersioning').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function goToTambahTim(id) {
    window.location.href = window.location.origin + "/pengembangan/tim/tambah/"+id;
}

function showDetailVersion(id) {
    showLoading();
    $.ajax({
        url: "/service-pengembangan/versioning/get-detail",
        type: "post",
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        data: {id: id},
        success: function (data) {
            swal.close();
            $('#modalLihatDetailVersion').modal('show');
            $('#detailVersionAplikasi').val(data.versioning);
            $('#detailTahunProject').val(data.thn_project);
            $('#detailStatus').val(data.proses.nama);
            $('#detailKeterangan').val(data.keterangan);

            $("#detailDokumenDasar").empty();
            var link = '/pengembangan/versioning/download/' + data.id_version + '/1';
            if(data.file_dokumen_dasar !== null){
                $('#detailDokumenDasar').append('<a href="'+link+'"><img src="/assets/media/files/pdf.svg" style="width: 40px; margin-left: -5px;"></a>');
            }else{
                $('#detailDokumenDasar').append("-");
            }
        }
    });
}

function hapusFileDokumenDasar(id) {
    swal.fire({
        title: "Hapus File Dokumen Dasar?",
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
                url: "/service-pengembangan/versioning/delete-file",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id, type:1},
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
                            document.getElementById('divDetailUploadDokumenDasar').style.display = "none";
                            document.getElementById('divUploadDokumenDasar').style.display = "block";
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function goToTambahDokumenProyek(id) {
    window.location.href = window.location.origin + "/pengembangan/dokumen/tambah/"+id;
}

function goToTambahProgress(id) {
    window.location.href = window.location.origin + "/pengembangan/progress/list/"+id;
}