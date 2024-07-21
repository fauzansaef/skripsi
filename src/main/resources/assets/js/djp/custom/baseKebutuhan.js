var BaseKebutuhan = function () {
    var loadTableKebutuhan = function () {

        var tableKebutuhan = $('#tabelKebutuhan').DataTable({
            "ajax": {
                "url": "/service-pengembangan/kebutuhan/list/" + $('#idVersionAplikasi').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy": true,
            "oLanguage": {
                "sLengthMenu": "Tampilkan _MENU_ data",
                "sZeroRecords": "Tidak ada data",
                "sInfo": "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                "sInfoEmpty": "Menampilkan 0 sampai 0 dari 0 data",
                "sLoadingRecords": "Sedang memuat...",
                "sProcessing": "Sedang memproses...",
                "sSearch": "Cari:"
            },
            "columns": [
                {
                    "data": "id_kebutuhan",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "keterangan"},
                {
                    "data": "null", render: function (data, type, row) {
                        if (row.terpenuhi === 1) {
                            return '<p class="text-success"><b>Terpenuhi</b></p>';
                        } else {
                            return '<p class="text-danger"><b>Belum Terpenuhi</b></p>';
                        }

                    }
                },
                {
                    "data": "null", render: function (data, type, row) {
                        if(row.tgl_terpenuhi===null){
                            return "-";
                        }
                        return row.tgl_terpenuhi;
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditKebutuhan" data-idkebutuhan="' + row['id_kebutuhan']+ '"data-kebutuhan="' + row['keterangan'] + '"data-terpenuhi="' + row['terpenuhi'] +  '"  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusKebutuhan(' + row['id_kebutuhan'] + ')">' +
                            '   <span class="svg-icon svg-icon-3">' +
                            '       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
                            '           <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"></path>' +
                            '           <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"></path>' +
                            '           <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"></path>' +
                            '       </svg>' +
                            '   </span>' +
                            '</button>';
                    }
                }
            ]
        });

        if ($('#cariTabelKebutuhan').length > 0) {
            var filterSearch = document.querySelector('[data-kebutuhan="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tableKebutuhan.search(e.target.value).draw();
            });
        }

        $("#formTambahKebutuhan").validate({
            rules: {
                inputKebutuhan: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahKebutuhan').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-pengembangan/kebutuhan/simpan/"+ $('#idVersionAplikasi').val(),
                    type: "POST",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        namaKebutuhan: $('#inputKebutuhan').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelKebutuhan').DataTable().ajax.reload(null, false);
                                $('#formTambahKebutuhan')[0].reset();
                            });
                        } else {
                            errorResult();
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $('#modalEditKebutuhan').on('show.bs.modal', function (event) {
            var idkebutuhan = $(event.relatedTarget).data('idkebutuhan');
            var kebutuhan = $(event.relatedTarget).data('kebutuhan');
            var terpenuhi = $(event.relatedTarget).data('terpenuhi');

            $(this).find('#idKebutuhan').val(idkebutuhan);
            $(this).find('#inputEditKebutuhan').val(kebutuhan);
            $(this).find('#inputEditTerpenuhi').val(terpenuhi).change();
        });

        $("#formEditKebutuhan").validate({
            rules: {
                inputEditKebutuhan: {required: true}
            },
            submitHandler: function () {
                $('#modalEditKebutuhan').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-pengembangan/kebutuhan/edit/"+ $('#idKebutuhan').val(),
                    type: "POST",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        namaKebutuhan: $('#inputEditKebutuhan').val(),
                        terpenuhi : $('#inputEditTerpenuhi :selected').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelKebutuhan').DataTable().ajax.reload(null, false);
                                $('#formEditKebutuhan')[0].reset();
                            });
                        } else {
                            errorResult();
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });



    };

    return {
        init: function () {
            loadTableKebutuhan();
        }
    };

}();


function hapusKebutuhan(id) {
    swal.fire({
        title: "Hapus Kebutuhan?",
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
                url: "/service-pengembangan/kebutuhan/delete/"+id,
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
                            $('#tabelKebutuhan').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}
jQuery(document).ready(function () {
    BaseKebutuhan.init();
});