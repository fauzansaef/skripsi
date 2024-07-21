"use strict";
// Class definition

var KTDatatableDashboardManajemenSurat = function () {

    var dashboardManajemenSurat = function () {
        $("#inputTanggalSurat").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y"
        });

        $("#inputTanggalSuratLhr").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y"
        });

    };

    var handleSurat = function () {
        var tabelBelumAlokasiProyek = $('#tabelBelumAlokasiProyek').DataTable({
            "ajax": {
                "url": "/service-manajemen/surat/list/1",
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
                {"data": "id_surat",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_surat'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+cekNull(row['no_surat'])+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/1" target="_blank">' + cekNull(row['file_surat']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+cekNull(row['no_surat'])+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ' ;
                        }
                    }
                },
                {"data": "perihal",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "stakeholder",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_lhr'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/2" target="_blank">' + cekNull(row['file_lhr']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ';
                        }
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        return "-";
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToEditSurat('+row['id_surat']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusSurat('+row['id_surat']+')">\n' +
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

        if ($('#cariTabelBelumAlokasiProyek').length > 0) {
            var filterSearch = document.querySelector('[data-belum-alokasi-proyek="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelBelumAlokasiProyek.search(e.target.value).draw();
            });
        }

        var tabelSudahAlokasiProyek = $('#tabelSudahAlokasiProyek').DataTable({
            "ajax": {
                "url": "/service-manajemen/surat/list/2",
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
                {"data": "id_surat",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_surat'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+cekNull(row['no_surat'])+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/1" target="_blank">' + cekNull(row['file_surat']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+row['no_surat']+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ';
                        }
                    }
                },
                {"data": "perihal",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "stakeholder",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_lhr'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/2"target="_blank">' + cekNull(row['file_lhr']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ';
                        }

                    }
                },
                {"data": "aplikasi",
                    render: function (data, type, row) {
                        return data;
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToEditSurat('+row['id_surat']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusSurat('+row['id_surat']+')">\n' +
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

        if ($('#cariTabelSudahAlokasiProyek').length > 0) {
            var filterSearch = document.querySelector('[data-sudah-alokasi-proyek="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelSudahAlokasiProyek.search(e.target.value).draw();
            });
        }

        var tabelIstiqomah = $('#tabelIstiqomah').DataTable({
            "ajax": {
                "url": "/service-manajemen/surat/list/3",
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
                {"data": "id_surat",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_surat'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+cekNull(row['no_surat'])+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/1" target="_blank">' + cekNull(row['file_surat']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+cekNull(row['no_surat'])+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ' ;
                        }
                    }
                },
                {"data": "perihal",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "stakeholder",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_lhr'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/2" target="_blank">' + cekNull(row['file_lhr']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ';
                        }
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        return "-";
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToEditSurat('+row['id_surat']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusSurat('+row['id_surat']+')">\n' +
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

        if ($('#cariTabelIstiqomah').length > 0) {
            var filterSearch = document.querySelector('[data-istiqomah="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelIstiqomah.search(e.target.value).draw();
            });
        }

        $("#formTambahVersiAplikasiSurat").validate({
            rules: {
                inputAplikasiSurat: {required: true},
                inputVersionAplikasiSurat: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahVersiAplikasiSurat').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/surat/simpan-versi-surat",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputAplikasiSurat: $('#inputAplikasiSurat').val(),
                        inputVersionAplikasiSurat: $('#inputVersionAplikasiSurat').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelVersiAplikasiSurat').DataTable().ajax.reload(null, false);
                                $('#formTambahVersiAplikasiSurat')[0].reset();
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

        var tabelVersiAplikasiSurat = $('#tabelVersiAplikasiSurat').DataTable({
            "ajax": {
                "url": "/service-manajemen/surat/list-versi-aplikasi-surat",
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
                {"data": "id_surat_versi",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "aplikasi"},
                {"data": "versioning"},
                {"data": "keterangan"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button type="button" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusVersiAplikasiSurat('+row['id_surat_versi']+')">' +
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

        $("#formTambahSurat").validate({
            rules: {
                inputNoSurat: {required: true},
                inputInstansiPenerbitSurat: {required: true},
                inputJenisSurat: {required: true},
                inputTanggalSurat: {required: true},
            },

            invalidHandler: function() {
                swal.fire({
                    title: "ERROR",
                    text: "Form belum lengkap",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-danger"
                    }
                });
            },

            submitHandler: function () {
                if($('#uploadFileLhr').prop('files')[0]){
                    if ($("#uploadFileLhr")[0].files[0].size > 31457280) {
                        swal.fire({
                            title: "ERROR",
                            text: "Ukuran file tidak boleh melebihi 30 Mb",
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-danger"
                            }
                        });
                        return false;
                    }
                }

                if($('#uploadFileSurat').prop('files')[0]){
                    if ($("#uploadFileSurat")[0].files[0].size > 31457280) {
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
                }

                var formData = new FormData();

                formData.append('inputNoSurat', $('#inputNoSurat').val());
                formData.append('inputInstansiPenerbitSurat', $('#inputInstansiPenerbitSurat').val());
                formData.append('inputJenisSurat', $('#inputJenisSurat').val());
                formData.append('inputTanggalSurat', $('#inputTanggalSurat').val());
                formData.append('inputPerihalSurat', $('#inputPerihalSurat').val());
                formData.append('uploadFileSurat', $('#uploadFileSurat').prop('files')[0]);
                formData.append('inputNoSuratLhr', $('#inputNoSuratLhr').val());
                formData.append('inputTanggalSuratLhr', $('#inputTanggalSuratLhr').val());
                formData.append('uploadFileLhr', $('#uploadFileLhr').prop('files')[0]);

                showLoading();
                $.ajax({
                    url: "/service-manajemen/surat/simpan",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Disimpan.",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/manajemen/surat/list";
                        });
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        if ($('#divDetailUploadFileSurat').length <= 0) {
            document.getElementById('divUploadFileSurat').style.display = "block";
        }

        if ($('#divDetailUploadFileLhr').length <= 0) {
            document.getElementById('divUploadFileLhr').style.display = "block";
        }

        $("#formEditSurat").validate({
            rules: {
                inputNoSurat: {required: true},
                inputInstansiPenerbitSurat: {required: true},
                inputJenisSurat: {required: true},
                inputTanggalSurat: {required: true},
            },

            invalidHandler: function() {
                swal.fire({
                    "icon":"error",
                    "text": "Form belum lengkap.",
                    "confirmButtonClass": "btn btn-secondary"
                });
            },

            submitHandler: function () {

                if($('#uploadFileLhr').prop('files')[0]){
                    if ($("#uploadFileLhr")[0].files[0].size > 31457280) {
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
                }

                if($('#uploadFileSurat').prop('files')[0]){
                    if ($("#uploadFileSurat")[0].files[0].size > 31457280) {
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
                }

                var formData = new FormData();

                formData.append('idSurat', $('#idSurat').val());
                formData.append('inputNoSurat', $('#inputNoSurat').val());
                formData.append('inputInstansiPenerbitSurat', $('#inputInstansiPenerbitSurat').val());
                formData.append('inputJenisSurat', $('#inputJenisSurat').val());
                formData.append('inputTanggalSurat', $('#inputTanggalSurat').val());
                formData.append('inputPerihalSurat', $('#inputPerihalSurat').val());
                formData.append('uploadFileSurat', $('#uploadFileSurat').prop('files')[0]);
                formData.append('inputNoSuratLhr', $('#inputNoSuratLhr').val());
                formData.append('inputTanggalSuratLhr', $('#inputTanggalSuratLhr').val());
                formData.append('uploadFileLhr', $('#uploadFileLhr').prop('files')[0]);

                showLoading();
                $.ajax({
                    url: "/service-manajemen/surat/edit",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/manajemen/surat/list";
                        });
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        var tabelEditVersiAplikasiSurat = $('#tabelEditVersiAplikasiSurat').DataTable({
            "ajax": {
                "url": "/service-manajemen/surat/list-edit-versi-aplikasi-surat/"+$('#idSurat').val(),
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
                {"data": "id_surat_versi",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "aplikasi"},
                {"data": "versioning"},
                {"data": "keterangan"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button type="button" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusVersiAplikasiSurat('+row['id_surat_versi']+')">' +
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

        $("#formEditVersiAplikasiSurat").validate({
            rules: {
                inputAplikasiSurat: {required: true},
                inputVersionAplikasiSurat: {required: true}
            },
            submitHandler: function () {
                $('#modalTambahVersiAplikasiSurat').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-manajemen/surat/edit-versi-surat",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idSurat: $('#idSurat').val(),
                        inputAplikasiSurat: $('#inputAplikasiSurat').val(),
                        inputVersionAplikasiSurat: $('#inputVersionAplikasiSurat').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelVersiAplikasiSurat').DataTable().ajax.reload(null, false);
                                $('#tabelEditVersiAplikasiSurat').DataTable().ajax.reload(null, false);
                                $('#formTambahVersiAplikasiSurat')[0].reset();
                                $('#formEditVersiAplikasiSurat')[0].reset();
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
            dashboardManajemenSurat();
            handleSurat();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardManajemenSurat.init();
});