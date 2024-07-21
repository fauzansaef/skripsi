"use strict";

function goToTambahSurat() {
    window.location.href = window.location.origin + "/manajemen/surat/tambah";
}

function goToBelumAlokasiProyek() {
    $('#tabelBelumAlokasiProyek').DataTable().ajax.reload(null, false);
}

function goToSudahAlokasiProyek() {
    $('#tabelSudahAlokasiProyek').DataTable().ajax.reload(null, false);
}

function goToIstiqomah() {
    $('#tabelIstiqomah').DataTable().ajax.reload(null, false);
}

function getVersionByAplikasi(sel) {
    showLoading();
    $.ajax({
        url: "/service-pengembangan/aplikasi/get-version-by-aplikasi",
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        type: "post",
        data: {id: sel.value},
        success: function (data) {
            swal.close();
            $('#inputVersionAplikasiSurat').empty();
            $('#inputVersionAplikasiSurat').append($("<option></option>").attr("value", ""));
            $.each(data, function (key, value) {
                $('#inputVersionAplikasiSurat')
                    .append($("<option></option>")
                        .attr("value", value['id_version'])
                        .attr("name", value['keterangan'])
                        .text(value['versioning']));
            });
            $("#divKeteranganVersioningSurat").css("display","none");
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

$("#inputVersionAplikasiSurat").change(function () {
    if ($('#inputVersionAplikasiSurat').find('option:selected').attr("name")) {
        $("#divKeteranganVersioningSurat").css("display","block")
        $("#divKeteranganVersioningSurat").html($('#inputVersionAplikasiSurat').find('option:selected').attr("name"));
    } else {
        $("#divKeteranganVersioningSurat").css("display", "none")
    }
})

function goToEditSurat(id) {
    window.location.href = window.location.origin + "/manajemen/surat/edit/"+id;
}

function hapusFileSurat(id) {
    swal.fire({
        title: "Hapus File Surat?",
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
                url: "/service-manajemen/surat/delete-file",
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
                            document.getElementById('divDetailUploadFileSurat').style.display = "none";
                            document.getElementById('divUploadFileSurat').style.display = "block";
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function hapusFileLhr(id) {
    swal.fire({
        title: "Hapus File LHR?",
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
                url: "/service-manajemen/surat/delete-file",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id, type:2},
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
                            document.getElementById('divDetailUploadFileLhr').style.display = "none";
                            document.getElementById('divUploadFileLhr').style.display = "block";
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
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
                url: "/service-manajemen/surat/delete",
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
                            $('#tabelBelumAlokasiProyek').DataTable().ajax.reload(null, false);
                            $('#tabelSudahAlokasiProyek').DataTable().ajax.reload(null, false);
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

function hapusVersiAplikasiSurat(id) {
    swal.fire({
        title: "Hapus Versi Aplikasi Surat?",
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
                url: "/service-manajemen/surat/delete-versi-surat",
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
                            $('#tabelVersiAplikasiSurat').DataTable().ajax.reload(null, false);
                            $('#tabelEditVersiAplikasiSurat').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}