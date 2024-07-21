
function getDetailAplikasi(sel) {
    showLoading();
    $.ajax({
        url: "/api/v1/perencanaan/versi_aplikasis/"+sel.value,
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        success: function (data) {
            swal.close();
            $('#inputKodeProyek').empty();
            $('#inputKeterangan').empty();
            $('#inputSubditPengampuAplikasi').empty();
            $('#inputSeksiPengampuAplikasi').empty();
            $('#inputPerwakilanBo').empty();
            if(data.aplikasi.kodeProject != null){
                $('#inputKodeProyek').attr("value", data.aplikasi.kodeProject);
            }else{
                $('#inputKodeProyek').attr("value", "-");
            }
            if(data.keterangan != null){
                $('#inputKeterangan').val(data.keterangan);
            }else{
                $('#inputKeterangan').val("-");
            }
            if(data.aplikasi.subdit.namaSubdit != null){
                $('#inputSubditPengampuAplikasi').attr("value", data.aplikasi.subdit.namaSubdit);
            }else{
                $('#inputSubditPengampuAplikasi').attr("value", "-");
            }
            if(data.aplikasi.seksi.namaSeksi != null){
                $('#inputSeksiPengampuAplikasi').attr("value", data.aplikasi.seksi.namaSeksi);
            }else{
                $('#inputSeksiPengampuAplikasi').attr("value", "-");
            }
            if(data.aplikasi.stakeholder != null){
                $('#inputPerwakilanBo').attr("value", data.aplikasi.stakeholder.namaStakeholder);
            }else{
                $('#inputPerwakilanBo').attr("value", "-");
            }

            $('#kontenLama').removeAttr("hidden");
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

$("#inputTanggalDokumen").flatpickr({
    todayBtn:  1,
    autoclose: true,
    dateFormat:"d-m-Y"
});

$("#inputTanggalDokumen1").flatpickr({
    todayBtn:  1,
    autoclose: true,
    dateFormat:"d-m-Y"
});


$('#uploadDokumen').change(function() {
    var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,150);
    $('#labelUploadDokumen').text(fileName.substring(0,150) + "...");
});

$('#uploadDokumen1').change(function() {
    var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,150);
    $('#labelUploadDokumen1').text(fileName.substring(0,150) + "...");
});

function getKegiatan(sel) {
    showLoading();
    $.ajax({
        url: "/api/v1/referensi/renker_kegiatans/"+sel.value,
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        success: function (data) {
            swal.close();
            $('#inputKegiatan').empty();
            $.each(data, function (key, value) {
                $('#inputKegiatan')
                    .append($("<option></option>")
                        .attr("value", value['idRenkerKegiatan'])
                        .text(value['namaKegiatan']));
            });
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

function getKegiatan2(sel) {
    showLoading();
    $.ajax({
        url: "/api/v1/referensi/renker_kegiatans/"+sel.value,
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        success: function (data) {
            swal.close();
            $('#inputKegiatan2').empty();
            $.each(data, function (key, value) {
                $('#inputKegiatan2')
                    .append($("<option></option>")
                        .attr("value", value['idRenkerKegiatan'])
                        .text(value['namaKegiatan']));
            });
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

$("#submitKegiatan").click(function() {
    // Get the input value

    let idKegiatan = $("#inputKegiatan").val();
    let namaKegiatan = $("#inputKegiatan").find(":selected").text();
    let uniqueID = new Date().getTime();

    // Check if the input value is not empty
    if (namaKegiatan.trim() !== "" && !kegiatanExists(namaKegiatan)) {
        let hiddenInput = `<input type="hidden" name="kegiatan[]" value="${idKegiatan}" data-id="${uniqueID}">`;
        $("#formTambahProyekLama").append(hiddenInput);
        // Add a new row to the table
        let newRow = `
            <tr data-id="${uniqueID}">
                <td>${namaKegiatan}</td>
                <td><button type="button" class="btn btn-danger">Hapus</button></td>
            </tr>
        `;

        $("#tabelKegiatan tbody").append(newRow);
        document.getElementById('inputRenker').disabled = true;
        $(".ranker").find(".select2-selection").addClass("form-select-solid");
        // $('.select2-selection').addClass('form-select-solid');
        // Clear the input field and hide the modal
        $("#inputKegiatan").val("");
        $("#modalTambahVersiAplikasiSurat").modal('hide');
    } else if(kegiatanExists(namaKegiatan)) {
        swal.fire({
            title: "Gagal",
            text: "Kegiatan Sudah Ada Pada Tabel",
            icon: "warning"
        });
    } else {
        // Handle empty input...
        swal.fire({
            title: "Gagal",
            text: "Masukan Kegiatan Dengan Benar",
            icon: "warning"
        });
    }
});

$("#submitKegiatan2").click(function() {
    // Get the input value

    let idKegiatan = $("#inputKegiatan2").val();
    let namaKegiatan = $("#inputKegiatan2").find(":selected").text();
    let uniqueID = new Date().getTime();

    // Check if the input value is not empty
    if (namaKegiatan.trim() !== "" && !kegiatanExists2(namaKegiatan)) {
        let hiddenInput = `<input type="hidden" name="kegiatan2[]" value="${idKegiatan}" data-id="${uniqueID}">`;
        $("#formTambahProyekBaru").append(hiddenInput);
        // Add a new row to the table
        let newRow = `
            <tr data-id="${uniqueID}">
                <td>${namaKegiatan}</td>
                <td><button type="button" class="btn btn-danger">Hapus</button></td>
            </tr>
        `;

        $("#tabelKegiatan2 tbody").append(newRow);
        document.getElementById('inputRenker2').disabled = true;
        $(".ranker").find(".select2-selection").addClass("form-select-solid");
        // $('.select2-selection').addClass('form-select-solid');
        // Clear the input field and hide the modal
        $("#inputKegiatan2").val("");
        $("#modalTambahVersiAplikasiSurat2").modal('hide');
    } else if(kegiatanExists(namaKegiatan)) {
        swal.fire({
            title: "Gagal",
            text: "Kegiatan Sudah Ada Pada Tabel",
            icon: "warning"
        });
    } else {
        // Handle empty input...
        swal.fire({
            title: "Gagal",
            text: "Masukan Kegiatan Dengan Benar",
            icon: "warning"
        });
    }
});

// Optionally, add an event listener to delete a row
$("#tabelKegiatan").on('click', '.btn-danger', function() {
    let uniqueID = $(this).closest('tr').data('id');
    $(this).closest('tr').remove();
    $("input[name='kegiatan[]'][data-id='" + uniqueID + "']").remove();

    console.log($("#tabelKegiatan tr").length);
    if ($("#tabelKegiatan tr").length === 1) {
        console.log($("#tabelKegiatan tr").length);

        $(".ranker").find(".select2-selection").removeClass("form-select-solid");
        // $(".select2-selection").removeClass("form-select-solid");
        document.getElementById('inputRenker').removeAttribute('disabled');
    }
});

$("#tabelKegiatan2").on('click', '.btn-danger', function() {
    let uniqueID = $(this).closest('tr').data('id');
    $(this).closest('tr').remove();
    $("input[name='kegiatan2[]'][data-id='" + uniqueID + "']").remove();

    console.log($("#tabelKegiatan2 tr").length);
    if ($("#tabelKegiatan2 tr").length === 1) {
        console.log($("#tabelKegiatan2 tr").length);

        $(".ranker").find(".select2-selection").removeClass("form-select-solid");
        // $(".select2-selection").removeClass("form-select-solid");
        document.getElementById('inputRenker2').removeAttribute('disabled');
    }
});

function kegiatanExists(namaKegiatan) {
    let exists = false;
    $("#tabelKegiatan tbody tr").each(function() {
        let currentNamaKegiatan = $(this).find('td:first').text().trim();
        if (currentNamaKegiatan === namaKegiatan) {
            exists = true;
            return false; // exit .each loop
        }
    });
    return exists;
}

function kegiatanExists2(namaKegiatan) {
    let exists = false;
    $("#tabelKegiatan2 tbody tr").each(function() {
        let currentNamaKegiatan = $(this).find('td:first').text().trim();
        if (currentNamaKegiatan === namaKegiatan) {
            exists = true;
            return false; // exit .each loop
        }
    });
    return exists;
}

$("#formTambahProyekLama").validate({
    rules: {
        inputAplikasi: {required: true},
        inputJnsDokumen: {required: true},
        inputNoDokumen: {required: true},
        inputTanggalDokumen: {required: true},
        uploadDokumen: {required: true},
    },
    submitHandler: function () {
        showLoading();

        if ($("#uploadDokumen")[0].files[0].size > 31457280) {
            swal.fire({
                title: "ERROR",
                text: "Ukuran file tidak boleh melebihi 30Mb",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-danger"
                }
            });
            return false;
        }

        var formData = new FormData();
        let versiAplikasi = {
            jnsProyek: "RFC",
            idAplikasi: $('#inputAplikasi').val(),
            wjbProchar: 0,
            jenisDokumenDasar: $('#inputJnsDokumen').val(),
            noDokumenDasar: $('#inputNoDokumen').val(),
            tglDokumenDasar: $('#inputTanggalDokumen').val(),
        };
        if ($("input[name='kegiatan[]']").length > 0) {
            versiAplikasi.idKegiatanRenker = $("input[name='kegiatan[]']").map(function() {
                return $(this).val();
            }).get();
        }

        // formData.append('versiAplikasi', '');
        formData.append('versiAplikasi', JSON.stringify(versiAplikasi));
        formData.append('file', $('#uploadDokumen')[0].files[0], $('#uploadDokumen')[0].files[0].name);

        $.ajax({
            url: "/api/v1/perencanaan/versi_aplikasis",
            type: "POST",
            headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                if(data === "0"){
                    errorResult();
                }else{
                    swal.fire({
                        title: "SUKSES",
                        text: "Proyek Berhasil Disimpan",
                        icon: "success"
                    }).then(function () {
                        window.location.href = "/perencanaan/list";
                    });
                }
            },
            error: function () {
                errorResult();
            }
        });
    }
});


function kegiatanExists2(namaKegiatan) {
    let exists = false;
    $("#tabelKegiatan2 tbody tr").each(function() {
        let currentNamaKegiatan = $(this).find('td:first').text().trim();
        if (currentNamaKegiatan === namaKegiatan) {
            exists = true;
            return false; // exit .each loop
        }
    });
    return exists;
}

$("#formTambahProyekBaru").validate({
    rules: {
        inputNamaAplikasi: {required: true},
        inputKategori: {required: true},
        inputKeterangan1: {required: true},
        inputSubditPengampuAplikasi1: {required: true},
        inputSeksiPengampuAplikasi1: {required: true},
        inputPerwakilanBisnisOwner: {required: true},
        inputBisnisOwner: {required: true},
        inputJnsDokumen1: {required: true},
        inputNoDokumen1: {required: true},
        inputTanggalDokumen1: {required: true},
        uploadDokumen1: {required: true},
    },
    submitHandler: function () {
        showLoading();

        if ($("#uploadDokumen1")[0].files[0].size > 31457280) {
            swal.fire({
                title: "ERROR",
                text: "Ukuran file tidak boleh melebihi 30Mb",
                icon: "error",
                customClass: {
                    confirmButton: "btn btn-danger"
                }
            });
            return false;
        }

        var formData2 = new FormData();
        let bo = $('#inputBisnisOwner').val().map(function(value) {
            return parseInt(value, 10);
        });
        let kategori = $('#inputKategori').val();
        let idKetagori = parseInt(kategori, 10);

        let subdit = $('#inputSubditPengampuAplikasi1').val();
        let idSubdit = parseInt(subdit, 10);

        let seksi = $('#inputSeksiPengampuAplikasi1').val();
        let idSeksi = parseInt(seksi, 10);

        let perwakilanStakeholder = $('#inputPerwakilanBisnisOwner').val();
        let idPerwakilanStakeholder = parseInt(perwakilanStakeholder, 10);

        let aplikasi = {
            jnsProyek: "BARU",
            namaAplikasi : $('#inputNamaAplikasi').val(),
            kategoriAplikasi : idKetagori,
            keterangan : $('#inputKeterangan1').val(),
            idSubdit : idSubdit,
            idSeksi : idSeksi,
            idPerwakilanStakeholder : idPerwakilanStakeholder,
            idBisnisOwner : bo,
            jenisDokumenDasar : $('#inputJnsDokumen1').val(),
            noDokumenDasar : $('#inputNoDokumen1').val(),
            tglDokumenDasar : $('#inputTanggalDokumen1').val(),

            // wjbProchar: 0,
        };
        if ($("input[name='kegiatan2[]']").length > 0) {
            aplikasi.idKegiatanRenker = $("input[name='kegiatan2[]']").map(function() {
                return $(this).val();
            }).get();
        }

        formData2.append('aplikasi', JSON.stringify(aplikasi));
        formData2.append('file', $('#uploadDokumen1')[0].files[0], $('#uploadDokumen1')[0].files[0].name);
        console.log("MASUKK KAKA");
        $.ajax({
            url: "/api/v1/perencanaan/aplikasis",
            type: "POST",
            headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            data: formData2,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("ini masuk ke url");
                if(data === "0"){
                    errorResult();
                }else{
                    swal.fire({
                        title: "SUKSES",
                        text: "Proyek Berhasil Disimpan",
                        icon: "success"
                    }).then(function () {
                        window.location.href = "/perencanaan/list";
                    });
                }
            },
            error: function () {
                errorResult();
            }
        });
    }
});

function getSeksiBySubdit(sel) {
    showLoading();
    $.ajax({
        url: "/service-pengembangan/aplikasi/get-seksi-by-subdit",
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        type: "post",
        data: {id: sel.value},
        success: function (data) {
            swal.close();
            $('#inputSeksiPengampuAplikasi1').empty();
            $('#inputSeksiPengampuAplikasi1').append($("<option></option>").attr("value", "").text("Pilih Seksi"));
            $.each(data, function (key, value) {
                $('#inputSeksiPengampuAplikasi1')
                    .append($("<option></option>")
                        .attr("value", value['id_seksi'])
                        .text(value['nama_seksi']));
            });
        },
        error: function () {
            swal.close();
            errorResult();
        }
    });
}

$("#submitTolak").click(function() {
    // Get the input value

    let alasan = $("#inputAlasan").val();
    let idVersi = $("#idVersi").val();

    swal.fire({
        title: "Tolak Inisiasi?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ya, tolak",
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
                url: "/api/v1/perencanaan/versi_aplikasis/inisiasi/tolak/"+idVersi+"?alasanTolak="+alasan,
                type: "patch",
                headers: {"X-CSRF-TOKEN": token},
                success: function (data) {
                    if(data.code === 200){
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Ditolak",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            window.location.href = "/perencanaan/list";
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
});


$("#submitSetujui").click(function() {
    // Get the input value
    let idVersi = $("#idVersi").val();

    swal.fire({
        title: "Setujui Inisiasi?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ya, setujui",
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
                url: "/api/v1/perencanaan/versi_aplikasis/inisiasi/setujui/"+idVersi,
                type: "patch",
                headers: {"X-CSRF-TOKEN": token},
                success: function (data) {
                    if(data.code === 200){
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Disetujui",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            window.location.href = "/perencanaan/list";
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
});

