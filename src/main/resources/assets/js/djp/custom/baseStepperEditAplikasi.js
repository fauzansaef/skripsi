function cariPegawaiStepper() {
    var token = $("meta[name='_csrf']").attr("content");
    var identity = $("#cariNIPPegawai").val();
    if (identity) {
        showLoading();
        $.ajax({
            url: "/service-monitoring/aplikasi/get-by-nip",
            headers: {"X-CSRF-TOKEN": token},
            type: "post",
            data: {identity: identity},
            success: function (data) {
                console.log(data);
                if (data === "") {
                    swal.fire({
                        title: "ERROR",
                        text: "Pegawai Tidak Ditemukan",
                        icon: "error"
                    })
                } else {
                    swal.close();
                    $("#detailPegawai").css("display","block");
                    $("#inputNamaPegawai").val(data.nama);
                    $("#inputNIPPendekPegawai").val(data.nip);
                }
            }
        });
    }else{
        swal.fire({
            title: "WARNING",
            text: "NIP Masih Kosong",
            icon: "warning"
        })
    }
}

function hapusTimStepper(id) {
    swal.fire({
        title: "Hapus Tim?",
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
                url: "/service-monitoring/aplikasi/delete-tim",
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
                            $('#tabelTim').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditDokumenPerencanaan').on('show.bs.modal', function (event) {
    var jenisDokumen = $(event.relatedTarget).data('jenisdokumen');
    var tglDokumen = $(event.relatedTarget).data('tgldokumen');

    $(this).find('#jenisDokumenPerencanaan').val(jenisDokumen);
    // $(this).find('#tglDokumenPerencanaan').val(tglDokumen);
    $(this).find('#textEditDokumenPerencanaan').text("Edit Dokumen " +jenisDokumen);
});

function hapusDokumenPerencanaan(attr) {
    swal.fire({
        title: "Hapus Dokumen?",
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
                url: "/service-monitoring/aplikasi/delete-dokumen-perencanaan",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: $('#idVersion').val(), type: attr.getAttribute("data-jenisdokumen")},
                success: function (data) {
                    if(data === "1"){
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelDokumenPerencanaan').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditDokumenPengembangan').on('show.bs.modal', function (event) {
    var jenisDokumen = $(event.relatedTarget).data('jenisdokumen');
    var tglDokumen = $(event.relatedTarget).data('tgldokumen');

    $(this).find('#jenisDokumenPengembangan').val(jenisDokumen);
    // $(this).find('#tglDokumenPengembangan').val(tglDokumen);
    $(this).find('#textEditDokumenPengembangan').text("Edit Dokumen " +jenisDokumen);
});

function hapusDokumenPengembangan(attr) {
    swal.fire({
        title: "Hapus Dokumen?",
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
                url: "/service-monitoring/aplikasi/delete-dokumen-pengembangan",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: $('#idVersion').val(), type: attr.getAttribute("data-jenisdokumen")},
                success: function (data) {
                    if(data === "1"){
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelDokumenPengembangan').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditDokumenPengujian').on('show.bs.modal', function (event) {
    var jenisDokumen = $(event.relatedTarget).data('jenisdokumen');
    var tglDokumen = $(event.relatedTarget).data('tgldokumen');

    $(this).find('#jenisDokumenPengujian').val(jenisDokumen);
    // $(this).find('#tglDokumenPengujian').val(tglDokumen);
    $(this).find('#textEditDokumenPengujian').text("Edit Dokumen " +jenisDokumen);
});

function hapusDokumenPengujian(attr) {
    swal.fire({
        title: "Hapus Dokumen?",
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
                url: "/service-monitoring/aplikasi/delete-dokumen-pengujian",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: $('#idVersion').val(), type: attr.getAttribute("data-jenisdokumen")},
                success: function (data) {
                    if(data === "1"){
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelDokumenPengujian').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

$('#modalEditDokumenDeployment').on('show.bs.modal', function (event) {
    var jenisDokumen = $(event.relatedTarget).data('jenisdokumen');
    var tglDokumen = $(event.relatedTarget).data('tgldokumen');

    $(this).find('#jenisDokumenDeployment').val(jenisDokumen);
    // $(this).find('#tglDokumenDeployment').val(tglDokumen);
    $(this).find('#textEditDokumenDeployment').text("Edit Dokumen " +jenisDokumen);
});

function hapusDokumenDeployment(attr) {
    swal.fire({
        title: "Hapus Dokumen?",
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
                url: "/service-monitoring/aplikasi/delete-dokumen-deployment",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: $('#idVersion').val(), type: attr.getAttribute("data-jenisdokumen")},
                success: function (data) {
                    if(data === "1"){
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelDokumenDeployment').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function hapusDokumen(id) {
    swal.fire({
        title: "Hapus Dokumen?",
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
                url: "/service-monitoring/aplikasi/delete-dokumen",
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

function cekNull(string) {
    if(string !== null){
        return string;
    } else {
        return '-';
    }
}

function hapusSurat(id) {
    swal.fire({
        title: "Hapus Surat?",
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
                url: "/service-monitoring/aplikasi/delete-surat",
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
                            $('#tabelSurat').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

