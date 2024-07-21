"use strict";

$('#modalEditBagianTim').on('show.bs.modal', function (event) {
    var idbagian = $(event.relatedTarget).data('idbagian');
    var namabagian = $(event.relatedTarget).data('namabagian');

    $(this).find('#idBagian').val(idbagian);
    $(this).find('#editNamaBagian').val(namabagian);
});

function hapusBagianTim(id) {
    swal.fire({
        title: "Hapus Bagian Tim?",
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
                url: "/service-manajemen/proyek/delete-bagiantim",
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
                            $('#tabelBagianTim').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditJenisDokumen').on('show.bs.modal', function (event) {
    var idjenisdokumen = $(event.relatedTarget).data('idjenisdokumen');
    var namajenisdokumen = $(event.relatedTarget).data('namajenisdokumen');
    var keterangan = $(event.relatedTarget).data('keterangan');

    $(this).find('#idJenisDokumen').val(idjenisdokumen);
    $(this).find('#editJenisDokumen').val(namajenisdokumen);
    $(this).find('#editKeteranganDokumen').val(keterangan);
});

function hapusJenisDokumen(id) {
    swal.fire({
        title: "Hapus Jenis Dokumen?",
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
                url: "/service-manajemen/proyek/delete-jenisdokumen",
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
                            $('#tabelJenisDokumen').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditKategori').on('show.bs.modal', function (event) {
    var idkategori = $(event.relatedTarget).data('idkategoriaplikasi');
    var namakategori = $(event.relatedTarget).data('namakategoriaplikasi');

    $(this).find('#idKategori').val(idkategori);
    $(this).find('#editNamaKategori').val(namakategori);
});

function hapusKategori(id) {
    swal.fire({
        title: "Hapus Kategori Aplikasi?",
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
                url: "/service-manajemen/proyek/delete-kategori",
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
                            $('#tabelKategori').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditJenisSurat').on('show.bs.modal', function (event) {
    var idjenissurat = $(event.relatedTarget).data('idjenissurat');
    var namajenissurat = $(event.relatedTarget).data('namajenissurat');
    var keterangan = $(event.relatedTarget).data('keterangan');

    $(this).find('#idJenisSurat').val(idjenissurat);
    $(this).find('#editJenisSurat').val(namajenissurat);
    $(this).find('#editKeteranganSurat').val(keterangan);
});

function hapusJenisSurat(id) {
    swal.fire({
        title: "Hapus Jenis Surat?",
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
                url: "/service-manajemen/proyek/delete-jenissurat",
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
                            $('#tabelJenisSurat').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditJatuhTempo').on('show.bs.modal', function (event) {
    var idjatuhtempo = $(event.relatedTarget).data('idjatuhtempo');
    var jatuhtempo = $(event.relatedTarget).data('jatuhtempo');

    $(this).find('#idJatuhTempo').val(idjatuhtempo);
    $(this).find('#editJatuhTempo').val(jatuhtempo);
});