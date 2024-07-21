var BaseRenker = function () {

    const stringToDate = function (dateString) {
        const [dd, mm, yyyy] = dateString.split("-");
        return new Date(`${yyyy}-${mm}-${dd}`);
    };

    var loadTableRenker = function () {
        var tableRenker = $('#tabelRenker').DataTable({
            "ajax": {
                "url": "/service-manajemen/renker/list-renker",
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
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "null", render: function (data, type, row) {
                        return '<a href="/manajemen/renker/kegiatan/' + row.id_renker + '" target="_blank" class="text-primary"><b>' + row.tahun + '</b></a>';

                    }
                },
                {
                    "data": "null", render: function (data, type, row) {
                        return '<a href="/manajemen/renker/download/' + row.file_renker + '" target="_blank" class="text-primary"><b>' + row.file_renker + '</b></a>';

                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditRenker" data-idrenker="' + row['id_renker'] + '"data-tahun="' + row['tahun'] + '"data-file="' + row['file_renker'] + '"  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusRenker(' + row['id_renker'] + ')">' +
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


        if ($('#cariTabelRenker').length > 0) {
            var filterSearch = document.querySelector('[data-renker="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tableRenker.search(e.target.value).draw();
            });
        }
    }

    $('#modalEditRenker').on('show.bs.modal', function (event) {
        var idrenker = $(event.relatedTarget).data('idrenker');
        var tahun = $(event.relatedTarget).data('tahun');
        var file = $(event.relatedTarget).data('file');

        $(this).find('#idRenker').val(idrenker);
        $(this).find('#editTahunRenker').val(tahun);
        $(this).find('#fileRenker').text(file);
        $('#fileRenker').attr('href', "/manajemen/renker/download/" + file)

    });

    $("#formEditRenker").validate({
        rules: {
            inputTahunRenker: {required: true},
        },
        invalidHandler: function () {
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
            if ($('#editFileRenker').prop('files')[0]) {
                if ($('#editFileRenker')[0].files[0].size > 31457280) {
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


            var formDataEdit = new FormData();
            formDataEdit.append('tahun', $('#editTahunRenker').val());
            formDataEdit.append('fileRenker', $('#editFileRenker').prop('files')[0]);
            $('#modalEditRenker').modal('hide');
            showLoading();

            $.ajax({
                url: "/service-manajemen/renker/edit/" + $("#idRenker").val(),
                type: "post",
                headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: formDataEdit,
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
                        $('#tabelRenker').DataTable().ajax.reload(null, false);
                        $('#formEditRenker')[0].reset();
                    });
                },
                error: function () {
                    errorResult();
                }
            });
        }


    })

    var handleRenker = function () {
        $("#formTambahRenker").validate({
            rules: {
                inputTahunRenker: {required: true},
            },
            invalidHandler: function () {
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
                if ($('#inputFileRenker').prop('files')[0]) {
                    if ($('#inputFileRenker')[0].files[0].size > 31457280) {
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


                var formData = new FormData();
                formData.append('tahun', $('#inputTahunRenker').val());
                formData.append('fileRenker', $('#inputFileRenker').prop('files')[0]);
                $('#modalTambahRenker').modal('hide');
                showLoading();

                $.ajax({
                    url: "/service-manajemen/renker/simpan",
                    type: "post",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
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
                            $('#tabelRenker').DataTable().ajax.reload(null, false);
                            $('#formTambahRenker')[0].reset();
                        });
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }

        })
    }

    var handleKegiatanRenker = function () {
        $('#formTambahKegiatanRenker').validate({
            rules: {
                inputKegiatanRenker: {required: true},
            },

            submitHandler: function () {
                var turunanRentsra;
                if ($("#inputTurunanRenstra").val() == '') {
                    turunanRentsra = null;
                } else {
                    turunanRentsra = $("#inputTurunanRenstra").val();
                }

                var dataKegiatanRenker = {
                    idRenker: parseInt($('#idRenkerKegiatanRenker').val()),
                    namaKegiatan: $("#inputKegiatanRenker").val(),
                    turunanRenstra: turunanRentsra,
                    periodeAwal: stringToDate($("#inputTglMulaiKegiatanRenker").val()),
                    periodeAkhir: stringToDate($("#inputTglSelesaiKegiatanRenker").val()),
                    subdit: $("#ddlSubditKegiatanRenker option:selected").val(),
                    seksi: $("#ddlSeksiKegiatanRenker option:selected").val()

                }
                $('#modalTambahKegiatanRenker').modal('hide');

                showLoading();

                $.ajax({
                    url: "/service-manajemen/renker/kegiatan/simpan",
                    type: "POST",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: JSON.stringify(dataKegiatanRenker),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data === 1) {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelKegiatanRenker').DataTable().ajax.reload(null, false);
                                $('#formTambahKegiatanRenker')[0].reset();
                            });
                        } else {
                            errorResult();
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error)
                        errorResult();
                    }
                });

            }
        })
    }

    var loadTableKegiatanRenker = function () {
        var tabelKegiatanRenker = $('#tabelKegiatanRenker').DataTable({
            "ajax": {
                "url": "/service-manajemen/renker/kegiatan/list-kegiatan/" + $('#idRenkerKegiatanRenker').val(),
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
                    "data": "id_renker_kegiatan",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[1] == null) {
                            return "-"
                        }
                        return row[1];
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[2] == null) {
                            return "-"
                        }
                        return row[2];
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[3] == null) {
                            return "-"
                        }
                        return row[3];
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[4] == null) {
                            return "-"
                        }
                        return row[4];
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[5] == null) {
                            return "-"
                        }
                        return row[5];
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[6] == null) {
                            return "-"
                        }
                        return row[6];
                    }
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        if (row[7] == null) {
                            return "-"
                        }
                        return row[7];
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Uraian Kegiatan" data-bs-toggle="modal" data-bs-target="#modalUraianKegiatan" data-idkegiatanrenker="' + row[0] + '"data-namakegiatan="' + row[1] + '"data-turunanrenstra="' + row[4] + '" ' +
                            ' class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">' +
                            '        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> ' +
                            '        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> ' +
                            '   </svg>' +
                            '</span>' +
                            '</button>' +
                            '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditKegiatanRenker" data-idkegiatanrenker="' + row[0] + '"data-namakegiatan="' + row[1] + '"data-mulai="' + row[2] + '"data-selesai="' + row[3] + '"data-turunanrenstra="' + row[4] + '"data-subdit="' + row[5] + '"data-seksi="' + row[6] + '"data-idsubdit="' + row[7] + '"data-idseksi="' + row[8] + '" ' +
                            ' class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusKegiatanRenker(' + row[0] + ')">' +
                            '   <span class="svg-icon svg-icon-3">' +
                            '       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
                            '           <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"></path>' +
                            '           <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"></path>' +
                            '           <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"></path>' +
                            '       </svg>\n' +
                            '   </span>' +
                            '</button>';
                    }
                }
            ]
        });


        if ($('#cariTabelKegiatanRenker').length > 0) {
            var filterSearch = document.querySelector('[data-kegiatanrenker="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelKegiatanRenker.search(e.target.value).draw();
            });
        }
    }

    var handleEditKegiatanRenker = function () {

        $('#modalEditKegiatanRenker').on('show.bs.modal', function (event) {
            var idkegiatanrenker = $(event.relatedTarget).data('idkegiatanrenker');
            var namakegiatan = $(event.relatedTarget).data('namakegiatan');
            var turunanrenstra = $(event.relatedTarget).data('turunanrenstra');
            var mulai = $(event.relatedTarget).data('mulai');
            var selesai = $(event.relatedTarget).data('selesai');
            var idsubdit = $(event.relatedTarget).data('idsubdit');
            var idseksi = $(event.relatedTarget).data('idseksi');


            $(this).find('#idKegiatanRenker').val(idkegiatanrenker);
            $(this).find('#editKegiatanRenker').val(namakegiatan);
            $(this).find('#editTurunanRenstra').val(turunanrenstra);
            $(this).find('#editTglMulaiKegiatanRenker').val(mulai);
            $(this).find('#editTglSelesaiKegiatanRenker').val(selesai);
            $(this).find('#ddlEditSubditKegiatanRenker').val(idsubdit).change();


            listEditSeksiBySubdit(idsubdit, idseksi);


        });


        $('#formEditKegiatanRenker').validate({
            rules: {
                editKegiatanRenker: {required: true},
            },

            submitHandler: function () {
                var turunanRentsra;
                if ($("#editTurunanRenstra").val() == '') {
                    turunanRentsra = null;
                } else {
                    turunanRentsra = $("#editTurunanRenstra").val();
                }

                var dataKegiatanRenker = {
                    idRenker: parseInt($('#idRenkerKegiatanRenker').val()),
                    namaKegiatan: $("#editKegiatanRenker").val(),
                    turunanRenstra: turunanRentsra,
                    periodeAwal: stringToDate($("#editTglMulaiKegiatanRenker").val()),
                    periodeAkhir: stringToDate($("#editTglSelesaiKegiatanRenker").val()),
                    subdit: $("#ddlEditSubditKegiatanRenker option:selected").val(),
                    seksi: $("#ddlEditSeksiKegiatanRenker option:selected").val()

                }
                $('#modalEditKegiatanRenker').modal('hide');

                showLoading();

                $.ajax({
                    url: "/service-manajemen/renker/kegiatan/edit/" + $('#idKegiatanRenker').val(),
                    type: "POST",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: JSON.stringify(dataKegiatanRenker),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data === 1) {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelKegiatanRenker').DataTable().ajax.reload(null, false);
                                $('#formTambahKegiatanRenker')[0].reset();
                            });
                        } else {
                            errorResult();
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error)
                        errorResult();
                    }
                });

            }
        })
    }


    $('#modalUraianKegiatan').on('show.bs.modal', function (event) {
        $('#formUraianKegiatanRenker')[0].reset();
        var idKegiatanRenker = $(event.relatedTarget).data('idkegiatanrenker');
        var namaKegiatan = $(event.relatedTarget).data('namakegiatan');
        var turunanRenstra = $(event.relatedTarget).data('turunanrenstra');

        $(this).find('#namaKegiatanUraian').val(namaKegiatan);
        $(this).find('#turunanRenstraUraian').val(turunanRenstra);

        loadTableUraianKegiatanRenker(idKegiatanRenker);


    });

    var loadTableUraianKegiatanRenker = function (idKegiatanRenker) {
        $('#tabelUraianKegiatan').DataTable({
            "ajax": {
                "url": "/service-manajemen/renker/kegiatan/uraian/list-uraian/" + idKegiatanRenker,
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
                    "data": "id_uraian_kegiatan",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "uraian_kegiatan",
                },

                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusUraianKegiatanRenker(' + row['id_uraian_kegiatan'] + ')">' +
                            '   <span class="svg-icon svg-icon-3">' +
                            '       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
                            '           <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"></path>' +
                            '           <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"></path>' +
                            '           <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"></path>' +
                            '       </svg>\n' +
                            '   </span>' +
                            '</button>';
                    }
                }
            ]
        });

        $('#formUraianKegiatanRenker').validate({
            rules: {
                inputUraianKegiatan: {required: true},
            },

            submitHandler: function () {
                var uraianKegiatan;
                if ($("#inputUraianKegiatan").val() == '') {
                    uraianKegiatan = null;
                } else {
                    uraianKegiatan = $("#inputUraianKegiatan").val();
                }

                showLoading();

                $.ajax({
                    url: "/service-manajemen/renker/kegiatan/uraian/simpan",
                    type: "POST",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idKegiatanRenker: idKegiatanRenker,
                        uraianKegiatanRenker: uraianKegiatan
                    },

                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelUraianKegiatan').DataTable().ajax.reload(null, false);
                                $('#formUraianKegiatanRenker')[0].reset();
                            });
                        } else {
                            errorResult();
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error)
                        errorResult();
                    }
                });

            }
        })
    }

    var listSubdit = function () {
        var options = $('#ddlSubditKegiatanRenker');
        options.empty();

        $.ajax({
            type: "GET",
            url: "/service-manajemen/bagian/list-subdit",

            success: function (data) {
                var html = "<option value=null selected>" + 'Pilih Subdit' + "</option>";
                for (var i = 0; i < data.length; i++) {
                    html = html + "<option value=" + data[i]['id_subdit'] + " >"
                        + data[i]['nama_subdit'] + "</option>";
                }
                options.append(html);
                listKantor = data;


            },
            error: function (xhr, status, error) {
                console.log("error" + error);
            }
        });
    }

    var listSeksiBySubdit = function () {

        $('#ddlSubditKegiatanRenker').change(function () {
            var options = $('#ddlSeksiKegiatanRenker');
            options.empty();

            $.ajax({
                type: "GET",
                url: "/service-manajemen/bagian/list-seksi/by-subdit/" + $('#ddlSubditKegiatanRenker option:selected').val(),

                success: function (data) {
                    var html = "<option value=null selected>" + 'Pilih Seksi' + "</option>";
                    for (var i = 0; i < data.length; i++) {
                        html = html + "<option value=" + data[i]['id_seksi'] + " >"
                            + data[i]['nama_seksi'] + "</option>";
                    }
                    options.append(html);
                    listKantor = data;

                },
                error: function (xhr, status, error) {
                    console.log("error" + error);
                }
            });
        })


    }

    var listEditSubdit = function () {
        var options = $('#ddlEditSubditKegiatanRenker');
        options.empty();

        $.ajax({
            type: "GET",
            url: "/service-manajemen/bagian/list-subdit",

            success: function (data) {
                var html = "<option value=null selected>" + 'Pilih Subdit' + "</option>";
                for (var i = 0; i < data.length; i++) {
                    html = html + "<option value=" + data[i]['id_subdit'] + " >"
                        + data[i]['nama_subdit'] + "</option>";
                }
                options.append(html);
                listKantor = data;


            },
            error: function (xhr, status, error) {
                console.log("error" + error);
            }
        });
    }

    var listEditSeksiBySubdit = function (idsubdit, idseksi) {
        var options = $('#ddlEditSeksiKegiatanRenker');


        $("#ddlEditSubditKegiatanRenker").on('change', function () {
            $.ajax({
                type: "GET",
                url: "/service-manajemen/bagian/list-seksi/by-subdit/" + $('#ddlEditSubditKegiatanRenker option:selected').val(),
                success: function (data) {
                    options.empty();
                    var html = "<option value=null selected>" + 'Pilih Seksi' + "</option>";
                    for (var i = 0; i < data.length; i++) {
                        html = html + "<option value=" + data[i]['id_seksi'] + " >"
                            + data[i]['nama_seksi'] + "</option>";
                    }
                    options.append(html);
                    listKantor = data;

                },
                error: function (xhr, status, error) {
                    console.log("error" + error);
                }
            });
        });


        if (idsubdit == null) {
            $("#ddlEditSubditKegiatanRenker").on('change', function () {

                $.ajax({
                    type: "GET",
                    url: "/service-manajemen/bagian/list-seksi/by-subdit/" + $('#ddlEditSubditKegiatanRenker option:selected').val(),

                    success: function (data) {
                        options.empty();
                        var html = "<option value=null selected>" + 'Pilih Seksi' + "</option>";
                        for (var i = 0; i < data.length; i++) {
                            html = html + "<option value=" + data[i]['id_seksi'] + " >"
                                + data[i]['nama_seksi'] + "</option>";
                        }
                        options.append(html);
                        listKantor = data;

                    },
                    error: function (xhr, status, error) {
                        console.log("error" + error);
                    }
                });
            });
        } else {

            $.ajax({
                type: "GET",
                url: "/service-manajemen/bagian/list-seksi/by-subdit/" + idsubdit,
                success: function (data) {
                    options.empty();
                    var html = "<option value=null>" + 'Pilih Seksi' + "</option>";
                    for (var i = 0; i < data.length; i++) {
                        if (data[i]['id_seksi'] === idseksi) {
                            html = html + "<option value=" + data[i]['id_seksi'] + " selected>"
                                + data[i]['nama_seksi'] + " </option>";
                        } else {
                            html = html + "<option value=" + data[i]['id_seksi'] + " >"
                                + data[i]['nama_seksi'] + "</option>";
                        }

                    }
                    options.append(html);
                    listKantor = data;

                },
                error: function (xhr, status, error) {
                    console.log("error" + error);
                }
            });
        }


    }

    var tanggalMulaiDanAkhirKegiatan = function () {
        $("#inputTglMulaiKegiatanRenker").flatpickr({
            todayBtn: 1,
            autoclose: true,
            dateFormat: "d-m-Y"
        });

        $("#inputTglSelesaiKegiatanRenker").flatpickr({
            todayBtn: 1,
            autoclose: true,
            dateFormat: "d-m-Y"
        });

        $("#editTglMulaiKegiatanRenker").flatpickr({
            todayBtn: 1,
            autoclose: true,
            dateFormat: "d-m-Y"
        });

        $("#editTglSelesaiKegiatanRenker").flatpickr({
            todayBtn: 1,
            autoclose: true,
            dateFormat: "d-m-Y"
        });

    };

    return {
        init: function () {
            loadTableRenker();
            handleRenker();
            handleEditKegiatanRenker();
            listSubdit();
            listSeksiBySubdit();
            listEditSubdit();
            loadTableKegiatanRenker();
            tanggalMulaiDanAkhirKegiatan();
            handleKegiatanRenker();
        }
    };
}();

function hapusRenker(id) {
    swal.fire({
        title: "Hapus Renker?",
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
                url: "/service-manajemen/renker/delete/" + id,
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
                            $('#tabelRenker').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function hapusKegiatanRenker(id) {
    swal.fire({
        title: "Hapus Kegiatan Renker?",
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
                url: "/service-manajemen/renker/kegiatan/delete/" + id,
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
                            $('#tabelKegiatanRenker').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function hapusUraianKegiatanRenker(id){
    swal.fire({
        title: "Hapus Uraian Kegiatan Renker?",
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
                url: "/service-manajemen/renker/kegiatan/uraian/delete/" + id,
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
                            $('#tabelUraianKegiatan').DataTable().ajax.reload(null, false);
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
    BaseRenker.init();
});