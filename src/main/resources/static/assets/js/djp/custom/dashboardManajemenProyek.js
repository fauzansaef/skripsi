"use strict";
// Class definition

var KTDatatableDashboardManajemenProyek = function () {

    var handleBagianTim = function () {

        var tabelBagianTim = $('#tabelBagianTim').DataTable({
            "ajax": {
                "url": "/service-manajemen/proyek/list-bagiantim",
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
                {"data": "id_bagian",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal"  data-bs-target="#modalEditBagianTim" data-idbagian="' + row['id_bagian'] + '" data-namabagian="' + row['nama'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusBagianTim('+row['id_bagian']+')">' +
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

        if($('#cariTabelBagianTim').length > 0) {
            var filterSearch = document.querySelector('[data-bagiantim="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelBagianTim.search(e.target.value).draw();
            });
        }

        $("#formTambahBagianTim").validate({
            rules: {
                inputNamaBagian: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahBagianTim').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/simpan-bagiantim",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputNamaBagian: $('#inputNamaBagian').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelBagianTim').DataTable().ajax.reload(null, false);
                                $('#formTambahBagianTim')[0].reset();
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

        $("#formEditBagianTim").validate({
            rules: {
                idBagian: {required: true},
                editNamaBagian: {required: true},
            },
            submitHandler: function () {
                $('#modalEditBagianTim').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/edit-bagiantim",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idBagian: $('#idBagian').val(),
                        editNamaBagian: $('#editNamaBagian').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelBagianTim').DataTable().ajax.reload(null, false);
                                $('#formEditBagianTim')[0].reset();
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

    var handleJenisDokumen = function () {
        var tabelJenisDokumen = $('#tabelJenisDokumen').DataTable({
            "ajax": {
                "url": "/service-manajemen/proyek/list-jenisdokumen",
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
                {"data": "id_jenis_dokumen",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama_jenis_dokumen"},
                {"data": "keterangan"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-bs-toggle="modal" title="Edit" data-bs-target="#modalEditJenisDokumen" data-idjenisdokumen="' + row['id_jenis_dokumen'] + '" data-namajenisdokumen="' + row['nama_jenis_dokumen'] + '" data-keterangan="' + row['keterangan'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusJenisDokumen('+row['id_jenis_dokumen']+')">' +
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

        if($('#cariTabelJenisDokumen').length > 0) {
            var filterSearch = document.querySelector('[data-jenisdokumen="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelJenisDokumen.search(e.target.value).draw();
            });
        }

        $("#formTambahJenisDokumen").validate({
            rules: {
                inputJenisDokumen: {required: true},
                inputKeteranganDokumen: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahJenisDokumen').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/simpan-jenisdokumen",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputJenisDokumen: $('#inputJenisDokumen').val(),
                        inputKeteranganDokumen: $('#inputKeteranganDokumen').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelJenisDokumen').DataTable().ajax.reload(null, false);
                                $('#formTambahJenisDokumen')[0].reset();
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

        $("#formEditJenisDokumen").validate({
            rules: {
                idJenisDokumen: {required: true},
                editJenisDokumen: {required: true},
            },
            submitHandler: function () {
                $('#modalEditJenisDokumen').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/edit-jenisdokumen",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idJenisDokumen: $('#idJenisDokumen').val(),
                        editJenisDokumen: $('#editJenisDokumen').val(),
                        editKeteranganDokumen: $('#editKeteranganDokumen').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelJenisDokumen').DataTable().ajax.reload(null, false);
                                $('#formEditJenisDokumen')[0].reset();
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

    var handleKategori = function () {
        var tabelKategori = $('#tabelKategori').DataTable({
            "ajax": {
                "url": "/service-manajemen/proyek/list-kategori",
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
                {"data": "id_kategori_aplikasi",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama_kategori_aplikasi"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-bs-toggle="modal" title="Edit" data-bs-target="#modalEditKategori" data-idkategoriaplikasi="' + row['id_kategori_aplikasi'] + '" data-namakategoriaplikasi="' + row['nama_kategori_aplikasi'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusKategori('+row['id_kategori_aplikasi']+')">' +
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

        if($('#cariTabelKategori').length > 0) {
            var filterSearch = document.querySelector('[data-kategori="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelKategori.search(e.target.value).draw();
            });
        }

        $("#formTambahKategori").validate({
            rules: {
                inputNamaKategori: {required: true},
            },
            submitHandler: function () {
                $('#modalTambahKategori').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/simpan-kategori",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputNamaKategori: $('#inputNamaKategori').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelKategori').DataTable().ajax.reload(null, false);
                                $('#formTambahKategori')[0].reset();
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

        $("#formEditKategori").validate({
            rules: {
                idKategori: {required: true},
                editNamaKategori: {required: true},
            },
            submitHandler: function () {
                $('#modalEditKategori').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/edit-kategori",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idKategori: $('#idKategori').val(),
                        editNamaKategori: $('#editNamaKategori').val(),
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelKategori').DataTable().ajax.reload(null, false);
                                $('#formEditKategori')[0].reset();
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

    var handleJenisSurat = function () {
        var tabelJenisSurat = $('#tabelJenisSurat').DataTable({
            "ajax": {
                "url": "/service-manajemen/proyek/list-jenissurat",
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
                {"data": "id_jenis_surat",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama_jenis_surat"},
                {"data": "keterangan"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-bs-toggle="modal" title="Edit" data-bs-target="#modalEditJenisSurat" data-idjenissurat="' + row['id_jenis_surat'] + '" data-namajenissurat="' + row['nama_jenis_surat'] + '" data-keterangan="' + row['keterangan'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusJenisSurat('+row['id_jenis_surat']+')">' +
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

        if($('#cariTabelJenisSurat').length > 0) {
            var filterSearch = document.querySelector('[data-jenissurat="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelJenisSurat.search(e.target.value).draw();
            });
        }

        $("#formTambahJenisSurat").validate({
            rules: {
                inputJenisSurat: {required: true},
                inputKeteranganSurat: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahJenisSurat').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/simpan-jenissurat",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputJenisSurat: $('#inputJenisSurat').val(),
                        inputKeteranganSurat: $('#inputKeteranganSurat').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelJenisSurat').DataTable().ajax.reload(null, false);
                                $('#formTambahJenisSurat')[0].reset();
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

        $("#formEditJenisSurat").validate({
            rules: {
                idJenisSurat: {required: true},
                editJenisSurat: {required: true},
            },
            submitHandler: function () {
                $('#modalEditJenisSurat').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/edit-jenissurat",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idJenisSurat: $('#idJenisSurat').val(),
                        editJenisSurat: $('#editJenisSurat').val(),
                        editKeteranganSurat: $('#editKeteranganSurat').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelJenisSurat').DataTable().ajax.reload(null, false);
                                $('#formEditJenisSurat')[0].reset();
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

    var handleJatuhTempo = function () {
        var tabelJatuhTempo = $('#tabelJatuhTempo').DataTable({
            "ajax": {
                "url": "/service-manajemen/proyek/list-jatuh-tempo",
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
                {"data": "null",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "jatuh_tempo"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-bs-toggle="modal" title="Edit" data-bs-target="#modalEditJatuhTempo" data-idjatuhtempo="' + row['id'] + '" data-jatuhtempo="' + row['jatuh_tempo'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"> ' +
                            '<span class="svg-icon svg-icon-3"> ' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path> ' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path> ' +
                            '   </svg> ' +
                            '</span> ' +
                            '</button> ';
                    }
                }
            ]
        });

        $("#formEditJatuhTempo").validate({
            rules: {
                idJatuhTempo: {required: true},
                editJatuhTempo: {required: true},
            },
            submitHandler: function () {
                $('#modalEditJatuhTempo').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/proyek/edit-jatuh-tempo",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idJatuhTempo: $('#idJatuhTempo').val(),
                        editJatuhTempo: $('#editJatuhTempo').val(),
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelJatuhTempo').DataTable().ajax.reload(null, false);
                                $('#formEditJatuhTempo')[0].reset();
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
    }

    return {
        init: function () {
            handleBagianTim();
            handleJenisDokumen();
            handleKategori();
            handleJenisSurat();
            handleJatuhTempo();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardManajemenProyek.init();
});