"use strict";

$('#modalEditSubdit').on('show.bs.modal', function (event) {
    var idsubdit = $(event.relatedTarget).data('idsubdit');
    var kodesubdit = $(event.relatedTarget).data('kodesubdit');
    var namasubdit = $(event.relatedTarget).data('namasubdit');

    $(this).find('#idSubdit').val(idsubdit);
    $(this).find('#editKodeSubdit').val(kodesubdit);
    $(this).find('#editNamaSubdit').val(namasubdit);
});

function hapusSubdit(id) {
    swal.fire({
        title: "Hapus Subdit?",
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
                url: "/service-manajemen/bagian/delete-subdit",
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
                            $('#tabelSubdit').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditSeksi').on('show.bs.modal', function (event) {
    var idseksi = $(event.relatedTarget).data('idseksi');
    var idsubdit = $(event.relatedTarget).data('idsubdit');
    var kodeseksi = $(event.relatedTarget).data('kodeseksi');
    var namaseksi = $(event.relatedTarget).data('namaseksi');

    $(this).find('#idSeksi').val(idseksi);
    $(this).find('#editSubdit').val(idsubdit);
    $(this).find('#editKodeSeksi').val(kodeseksi);
    $(this).find('#editNamaSeksi').val(namaseksi);
});

function hapusSeksi(id) {
    swal.fire({
        title: "Hapus Seksi?",
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
                url: "/service-manajemen/bagian/delete-seksi",
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
                            $('#tabelSeksi').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditStakeholder').on('show.bs.modal', function (event) {
    var idstakeholder = $(event.relatedTarget).data('idstakeholder');
    var namastakeholder = $(event.relatedTarget).data('namastakeholder');
    var jenisstakeholder = $(event.relatedTarget).data('jenisstakeholder');

    $(this).find('#idStakeholder').val(idstakeholder);
    $(this).find('#editNamaStakeholder').val(namastakeholder);
    $(this).find('#editJenisStakeholder').val(jenisstakeholder);
});

function hapusStakeholder(id) {
    swal.fire({
        title: "Hapus Stakeholder?",
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
                url: "/service-manajemen/bagian/delete-stakeholder",
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
                            $('#tabelStakeholder').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}