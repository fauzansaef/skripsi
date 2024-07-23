function goToMonitoringProses() {
    $('#tabelMonitoringProses').DataTable().ajax.reload(null, false);
}

function goToMonitoringPublish() {
    $('#tabelMonitoringPublish').DataTable().ajax.reload(null, false);
}

function goToMonitoringPembatalan() {
    $('#tabelMonitoringPembatalan').DataTable().ajax.reload(null, false);
}

function goToDetailAplikasi(id) {
    // window.location.href = window.location.origin + "/monitoring/aplikasi/detail/" + id;
    window.open(window.location.origin + "/monitoring/aplikasi/detail/" + id,'_blank');
}


function goToStepperEditAplikasi() {
    window.open(window.location.origin + "/monitoring/aplikasi/stepper-edit-aplikasi/"+ $('#idAplikasi').val() +"/"+$('#idVersion').val(), '_blank');
}

function goToEditKebutuhanAplikasi(){
    window.open(window.location.origin + "/monitoring/aplikasi/detail/"+$('#idVersion').val()+"/kebutuhan",'_blank')
}

function searchTableMonitoringProses() {
    $('#tabelMonitoringProses').DataTable().ajax.reload(null, false);
}

function searchTableMonitoringPublish() {
    $('#tabelMonitoringPublish').DataTable().ajax.reload(null, false);
}

function searchTableMonitoringPembatalan() {
    $('#tabelMonitoringPembatalan').DataTable().ajax.reload(null, false);
}

function goToTambahSurat(id) {
    window.location.href = window.location.origin + "/monitoring/aplikasi/tambah-surat-by-monitoring/" + id;
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
        if (e.isConfirmed === true) {
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/service-manajemen/surat/delete",
                type: "post",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id},
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
                            $('#tabelSuratByMonitoring').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function goToEditSurat(id) {
    window.location.href = window.location.origin + "/monitoring/aplikasi/edit-surat-by-monitoring/" + id;
}

function cekNull(string) {
    if (string !== null) {
        return string;
    } else {
        return '-';
    }
}

function cetakDetailAplikasi(id) {
    window.open(window.location.origin + '/monitoring/aplikasi/cetak/' + id, '_blank');
}

function goToTanyaJawab(id) {
    // window.location.href = window.location.origin + "/monitoring/aplikasi/tanya-jawab/" + id;
    window.open(window.location.origin + "/monitoring/aplikasi/tanya-jawab/" + id,'_blank')
}