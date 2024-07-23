"use strict";
// Class definition

var KTDatatableDashboardAplikasi = function () {

    var handleProyek = function () {
        var tabelProyekAplikasi = $('#tabelProyekAplikasi').DataTable({
            "ajax": {
                "url": "/service-pengembangan/aplikasi/list",
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
                {"data": "id_aplikasi",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['keterangan'] !== null){
                            return '<a href="#" onclick="goToDaftarVersioning('+row['id_aplikasi']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['nama']+'</a>\n' +
                                ' <span class="text-muted fw-bold d-block" style="font-size: 12px;">'+row['keterangan'].toString().substring(0,200)+'</span>';
                        } else {
                            return '<a href="#" onclick="goToDaftarVersioning('+row['id_aplikasi']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['nama']+'</a>';
                        }
                    }
                },
                {"data": "kode_project"},
                {"data": "seksi"},
                {"data": "stakeholder"},
                {"data": "kategori"},
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['status'] === "1" || row['status'] === 1){
                            return 'Aktif';
                        } else {
                            return 'Terminated';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToEditAplikasi('+row['id_aplikasi']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusAplikasi('+row['id_aplikasi']+')">\n' +
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

        if ($('#cariTabelProyekAplikasi').length > 0) {
            var filterSearch = document.querySelector('[data-proyekaplikasi="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelProyekAplikasi.search(e.target.value).draw();
            });
        }

        $("#formTambahProyekAplikasi").validate({
            rules: {
                inputNamaAplikasi: {required: true},
                inputSubditPengampuAplikasi: {required: true},
                inputSeksiPengampuAplikasi: {required: true},
                inputStakeholderAplikasi: {required: true},
                inputKategoriAplikasi: {required: true}
            },

            submitHandler: function () {
                showLoading();
                $.ajax({
                    url: "/service-pengembangan/aplikasi/simpan-aplikasi",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputKodeProyek: $('#inputKodeProyek').val(),
                        inputNamaAplikasi: $('#inputNamaAplikasi').val(),
                        inputKeteranganAplikasi: $('#inputKeteranganAplikasi').val(),
                        inputSubditPengampuAplikasi: $('#inputSubditPengampuAplikasi').val(),
                        inputSeksiPengampuAplikasi: $('#inputSeksiPengampuAplikasi').val(),
                        inputStakeholderAplikasi: $('#inputStakeholderAplikasi').val(),
                        inputKategoriAplikasi: $('#inputKategoriAplikasi').val(),
                        inputSourcecodeAplikasi: $('#inputSourcecodeAplikasi').val(),
                        inputInfrastrukturAplikasi: $('#inputInfrastrukturAplikasi').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                window.location.href = "/pengembangan/aplikasi/list";
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

    var handleEditProyek = function () {
        $("#formEditProyekAplikasi").validate({
            rules: {
                inputNamaAplikasi: {required: true},
                inputSubditPengampuAplikasi: {required: true},
                inputSeksiPengampuAplikasi: {required: true},
                inputStakeholderAplikasi: {required: true},
                inputKategoriAplikasi: {required: true}
            },

            submitHandler: function () {
                showLoading();
                $.ajax({
                    url: "/service-pengembangan/aplikasi/edit-aplikasi",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idAplikasi: $('#idAplikasi').val(),
                        inputKodeProyek: $('#inputKodeProyek').val(),
                        inputNamaAplikasi: $('#inputNamaAplikasi').val(),
                        inputKeteranganAplikasi: $('#inputKeteranganAplikasi').val(),
                        inputSubditPengampuAplikasi: $('#inputSubditPengampuAplikasi').val(),
                        inputSeksiPengampuAplikasi: $('#inputSeksiPengampuAplikasi').val(),
                        inputStakeholderAplikasi: $('#inputStakeholderAplikasi').val(),
                        inputKategoriAplikasi: $('#inputKategoriAplikasi').val(),
                        inputSourcecodeAplikasi: $('#inputSourcecodeAplikasi').val(),
                        inputInfrastrukturAplikasi: $('#inputInfrastrukturAplikasi').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                window.location.href = "/pengembangan/aplikasi/list";
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
            handleProyek();
            handleEditProyek();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardAplikasi.init();
});