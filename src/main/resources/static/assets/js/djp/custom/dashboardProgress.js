"use strict";
// Class definition

var KTDatatableDashboardProgress = function () {

    var dashboardProgress = function () {
        $("#inputWaktu").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"Y-m-d"
        });

    };

    var handleProgress = function () {
        var tabelProgressAplikasi = $('#tabelProgressAplikasi').DataTable({
            "ajax": {
                "url": "/service-pengembangan/progress/list/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
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
                {"data": "null",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "persen"},
                {"data": "keterangan"},
                {"data": "kendala_solusi"},
                {"data": "wkt_progress",
                    render: function (data, type, row) {
                        return moment(new Date(data)).format("DD/MM/YYYY");
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusProgressAplikasi('+row['id_progress']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />\n' +
                            '                   <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />\n' +
                            '                   <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>';
                    }
                }
            ]
        });

        if ($('#cariTabelProgress').length > 0) {
            var filterSearch = document.querySelector('[data-daftarprogress="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelProgressAplikasi.search(e.target.value).draw();
            });
        }

        $("#formTambahProgressAplikasi").validate({
            rules: {
                inputProgress: {required: true},
                inputKeterangan: {required: true},
                inputWaktu: {required: true},
                inputKendalaSolusi: {required: true}
            },

            submitHandler: function () {
                $('#modalTambahProgressAplikasi').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-pengembangan/progress/simpan-progress",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputKendalaSolusi: $('#inputKendalaSolusi').val(),
                        inputProgress: $('#inputProgress').val(),
                        inputKeterangan: $('#inputKeterangan').val(),
                        inputWaktu: $('#inputWaktu').val(),
                        idVersion: $('#idVersion').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelProgressAplikasi').DataTable().ajax.reload(null, false);
                                $('#formTambahProgressAplikasi')[0].reset();
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
            dashboardProgress()
            handleProgress()
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardProgress.init();
});