"use strict";
// Class definition

var KTDatatableDashboardManajemenBagian = function () {

    var handleSubdit = function () {

        var tabelSubdit = $('#tabelSubdit').DataTable({
            "ajax": {
                "url": "/service-manajemen/bagian/list-subdit",
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
                {"data": "id_subdit",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "kode_subdit"},
                {"data": "nama_subdit"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditSubdit" data-idsubdit="' + row['id_subdit'] + '" data-kodesubdit="' + row['kode_subdit'] + '" data-namasubdit="' + row['nama_subdit'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusSubdit('+row['id_subdit']+')">' +
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

        if($('#cariTabelSubdit').length > 0) {
            var filterSearch = document.querySelector('[data-subdit="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelSubdit.search(e.target.value).draw();
            });
        }

        $("#formTambahSubdit").validate({
            rules: {
                inputKodeSubdit: {required: true},
                inputNamaSubdit: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahSubdit').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/bagian/simpan-subdit",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputKodeSubdit: $('#inputKodeSubdit').val(),
                        inputNamaSubdit: $('#inputNamaSubdit').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelSubdit').DataTable().ajax.reload(null, false);
                                $('#formTambahSubdit')[0].reset();
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

        $("#formEditSubdit").validate({
            rules: {
                idSubdit: {required: true},
                editKodeSubdit: {required: true},
                editNamaSubdit: {required: true}
            },
            submitHandler: function () {
                $('#modalEditSubdit').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/bagian/edit-subdit",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idSubdit: $('#idSubdit').val(),
                        editKodeSubdit: $('#editKodeSubdit').val(),
                        editNamaSubdit: $('#editNamaSubdit').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelSubdit').DataTable().ajax.reload(null, false);
                                $('#formEditSubdit')[0].reset();
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

    var handleSeksi = function () {
        var tabelSeksi = $('#tabelSeksi').DataTable({
            "ajax": {
                "url": "/service-manajemen/bagian/list-seksi",
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
                "sSearch": "Cari:",
            },
            "columns": [
                {"data": "id_seksi",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "kode_seksi"},
                {"data": "nama_seksi"},
                {"data": "subdit.nama_subdit"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditSeksi" data-idseksi="' + row['id_seksi'] + '" data-kodeseksi="' + row['kode_seksi'] + '" data-namaseksi="' + row['nama_seksi'] + '" data-idsubdit="' + row['id_subdit'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusSeksi('+row['id_seksi']+')">' +
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

        if ($('#cariTabelSeksi').length > 0) {
            var filterSearch = document.querySelector('[data-seksi="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelSeksi.search(e.target.value).draw();
            });
        }

        $("#formTambahSeksi").validate({
            rules: {
                inputKodeSeksi: {required: true},
                inputNamaSeksi: {required: true},
                inputSubdit: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahSeksi').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/bagian/simpan-seksi",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputKodeSeksi: $('#inputKodeSeksi').val(),
                        inputNamaSeksi: $('#inputNamaSeksi').val(),
                        inputSubdit: $('#inputSubdit').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelSeksi').DataTable().ajax.reload(null, false);
                                $('#formTambahSeksi')[0].reset();
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

        $("#formEditSeksi").validate({
            rules: {
                editKodeSeksi: {required: true},
                editNamaSeksi: {required: true},
                editSubdit: {required: true}
            },
            submitHandler: function () {
                $('#modalEditSeksi').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/bagian/edit-seksi",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idSeksi: $('#idSeksi').val(),
                        editSubdit: $('#editSubdit').val(),
                        editKodeSeksi: $('#editKodeSeksi').val(),
                        editNamaSeksi: $('#editNamaSeksi').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelSeksi').DataTable().ajax.reload(null, false);
                                $('#formEditSeksi')[0].reset();
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

    var handleStakeholder = function () {
        var tabelStakeholder = $('#tabelStakeholder').DataTable({
            "ajax": {
                "url": "/service-manajemen/bagian/list-stakeholder",
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
                {"data": "id_stakeholder",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama_stakeholder"},
                {"data": "jenis_stakeholder"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditStakeholder" data-idstakeholder="' + row['id_stakeholder'] + '" data-namastakeholder="' + row['nama_stakeholder'] + '" data-jenisstakeholder="' + row['jenis_stakeholder'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusStakeholder('+row['id_stakeholder']+')">' +
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

        if ($('#cariTabelStakeholder').length > 0) {
            var filterSearch = document.querySelector('[data-stakeholder="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelStakeholder.search(e.target.value).draw();
            });
        }

        $("#formTambahStakeholder").validate({
            rules: {
                inputNamaStakeholder: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahStakeholder').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/bagian/simpan-stakeholder",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputNamaStakeholder: $('#inputNamaStakeholder').val(),
                        inputJenisStakeholder: $('#inputJenisStakeholder').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelStakeholder').DataTable().ajax.reload(null, false);
                                $('#formTambahStakeholder')[0].reset();
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

        $("#formEditStakeholder").validate({
            rules: {
                editNamaStakeholder: {required: true}
            },
            submitHandler: function () {
                $('#modalEditStakeholder').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/bagian/edit-stakeholder",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idStakeholder: $('#idStakeholder').val(),
                        editNamaStakeholder: $('#editNamaStakeholder').val(),
                        editJenisStakeholder: $('#editJenisStakeholder').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelStakeholder').DataTable().ajax.reload(null, false);
                                $('#formEditStakeholder')[0].reset();
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
            handleSubdit();
            handleSeksi();
            handleStakeholder();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardManajemenBagian.init();
});