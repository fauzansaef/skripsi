function hapusTim(id) {
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
                url: "/service-pengembangan/tim/delete-tim",
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

function cariPegawai() {
    var token = $("meta[name='_csrf']").attr("content");
    var identity = $("#cariNIPPegawai").val();
    if (identity) {
        showLoading();
        $.ajax({
            url: "/service-pengembangan/tim/get-by-nip",
            headers: {"X-CSRF-TOKEN": token},
            type: "post",
            data: {identity: identity},
            success: function (data) {
                if (data === "0") {
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

function goToTambahDokumenProyek(id) {
    window.location.href = window.location.origin + "/pengembangan/dokumen/tambah/"+id;
}

function goToEditDokumenProyek(id) {
    window.location.href = window.location.origin + "/monitoring/aplikasi/edit-dokumen-by-monitoring/"+id;
}
