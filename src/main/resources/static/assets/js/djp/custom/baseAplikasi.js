function goToTambahAplikasi() {
    window.location.href = window.location.origin + "/pengembangan/aplikasi/tambah";
}

function getSeksiBySubdit(sel) {
    showLoading();
    $.ajax({
        url: "/service-pengembangan/aplikasi/get-seksi-by-subdit",
        headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
        type: "post",
        data: {id: sel.value},
        success: function (data) {
            swal.close();
            $('#inputSeksiPengampuAplikasi').empty();
            $('#inputSeksiPengampuAplikasi').append($("<option></option>").attr("value", "").text("Pilih Seksi"));
            $.each(data, function (key, value) {
                $('#inputSeksiPengampuAplikasi')
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

function goToEditAplikasi(id) {
    window.location.href = window.location.origin + "/pengembangan/aplikasi/edit/"+id;
}

function hapusAplikasi(id) {
    swal.fire({
        title: "Hapus Proyek Aplikasi?",
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
                url: "/service-pengembangan/aplikasi/delete-aplikasi",
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
                            $('#tabelProyekAplikasi').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}


