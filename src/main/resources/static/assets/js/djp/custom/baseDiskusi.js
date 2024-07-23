"use strict";

function goToJawaban(id) {
    window.location.href = window.location.origin + "/diskusi/jawaban/"+id;
}

function updateSolved(id, type) {
    var token = $("meta[name='_csrf']").attr("content");
    showLoading();
    $.ajax({
        url: "/service-diskusi/edit-solved-pertanyaan",
        type: "post",
        headers: {"X-CSRF-TOKEN": token},
        data: {id: id},
        success: function (data) {
            if(data === "1"){
                swal.fire({
                    title: "SUKSES",
                    text: "Problem Solved",
                    icon: "success",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function () {
                    if(type == 1){
                        $('#tabelTanyaJawab').DataTable().ajax.reload(null, false);
                        $('#tabelPertanyaan').DataTable().ajax.reload(null, false);
                        $('#tabelTanyaJawabAplikasi').DataTable().ajax.reload(null, false);
                        $('#tabelPertanyaanAplikasi').DataTable().ajax.reload(null, false);
                    } else {
                        location.reload();
                    }
                });
            } else {
                errorResult();
            }
        }
    });
}

function hapusPertanyaan(id, type) {
    swal.fire({
        title: "Hapus Pertanyaan?",
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
                url: "/service-diskusi/delete-pertanyaan",
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
                            if(type == 1) {
                                $('#tabelTanyaJawab').DataTable().ajax.reload(null, false);
                                $('#tabelPertanyaan').DataTable().ajax.reload(null, false);
                                $('#tabelTanyaJawabAplikasi').DataTable().ajax.reload(null, false);
                                $('#tabelPertanyaanAplikasi').DataTable().ajax.reload(null, false);
                            } else {
                                window.location.href = window.location.origin + "/diskusi/list-tanya-jawab";
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

function updateSolvedJawaban(id) {
    var token = $("meta[name='_csrf']").attr("content");
    showLoading();
    $.ajax({
        url: "/service-diskusi/edit-solved-jawaban",
        type: "post",
        headers: {"X-CSRF-TOKEN": token},
        data: {id: id},
        success: function (data) {
            if(data === "1"){
                swal.fire({
                    title: "SUKSES",
                    text: "Problem Solved",
                    icon: "success",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function () {
                    location.reload();
                });
            } else {
                errorResult();
            }
        }
    });
}

function hapusJawaban(id) {
    swal.fire({
        title: "Hapus Jawaban?",
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
                url: "/service-diskusi/delete-jawaban",
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
                            $('#tabelJawaban').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function getStatusPertanyaan() {
    $('#tabelTanyaJawab').DataTable().ajax.reload(null, false);
    $('#tabelTanyaJawabAplikasi').DataTable().ajax.reload(null, false);
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
            $('#inputVersionAplikasiTanyaJawab').empty();
            $('#inputVersionAplikasiTanyaJawab').append($("<option></option>").attr("value", ""));
            $.each(data, function (key, value) {
                $('#inputVersionAplikasiTanyaJawab')
                    .append($("<option></option>")
                        .attr("value", value['id_version'])
                        .attr("name", value['keterangan'])
                        .text(value['versioning']));
            });
            $("#divKeteranganVersioningTanyaJawab").css("display","none");
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

$("#inputVersionAplikasiTanyaJawab").change(function () {
    if ($('#inputVersionAplikasiTanyaJawab').find('option:selected').attr("name")) {
        $("#divKeteranganVersioningTanyaJawab").css("display","block")
        $("#divKeteranganVersioningTanyaJawab").html($('#inputVersionAplikasiTanyaJawab').find('option:selected').attr("name"));
    } else {
        $("#divKeteranganVersioningTanyaJawab").css("display", "none")
    }
});

function getEditVersionByAplikasi(sel) {
    showLoading();
    $.ajax({
        url: "/service-pengembangan/aplikasi/get-version-by-aplikasi",
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        type: "post",
        data: {id: sel.value},
        success: function (data) {
            swal.close();
            $('#editVersionAplikasiTanyaJawab').empty();
            $('#editVersionAplikasiTanyaJawab').append($("<option></option>").attr("value", ""));
            $.each(data, function (key, value) {
                $('#editVersionAplikasiTanyaJawab')
                    .append($("<option></option>")
                        .attr("value", value['id_version'])
                        .attr("name", value['keterangan'])
                        .text(value['versioning']));
            });
            $("#divEditKeteranganVersioningTanyaJawab").css("display","none");
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

$("#editVersionAplikasiTanyaJawab").change(function () {
    if ($('#editVersionAplikasiTanyaJawab').find('option:selected').attr("name")) {
        $("#divEditKeteranganVersioningTanyaJawab").css("display","block")
        $("#divEditKeteranganVersioningTanyaJawab").html($('#editVersionAplikasiTanyaJawab').find('option:selected').attr("name"));
    } else {
        $("#divEditKeteranganVersioningTanyaJawab").css("display", "none")
    }
})


function getSelectedEditVersionByAplikasi(sel, ver, ket) {
    showLoading();
    $.ajax({
        url: "/service-pengembangan/aplikasi/get-version-by-aplikasi",
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        type: "post",
        data: {id: sel},
        success: function (data) {
            swal.close();
            $('#editVersionAplikasiTanyaJawab').empty();
            $('#editVersionAplikasiTanyaJawab').append($("<option></option>").attr("value", ""));
            $.each(data, function (key, value) {
                $('#editVersionAplikasiTanyaJawab')
                    .append($("<option></option>")
                        .attr("value", value['id_version'])
                        .attr("name", value['keterangan'])
                        .attr("selected", ver)
                        .text(value['versioning']));
            });
            $("#divEditKeteranganVersioningTanyaJawab").html(ket);
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}
