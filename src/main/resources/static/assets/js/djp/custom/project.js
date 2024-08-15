"use strict";
var project = function () {


    $("#inputTglNd").flatpickr({
        todayBtn: 1,
        autoclose: true,
        dateFormat: "d-m-Y"
    });

    $("#editTglNd").flatpickr({
        todayBtn: 1,
        autoclose: true,
        dateFormat: "d-m-Y"
    });

    $("#tglAwal").flatpickr({
        todayBtn: 1,
        autoclose: true,
        dateFormat: "d-m-Y"
    });

    $("#tglAkhir").flatpickr({
        todayBtn: 1,
        autoclose: true,
        dateFormat: "d-m-Y"
    });

    $('#btnAddProject').on('click', function () {
        $('#addProjectModal').modal('show');
    });


    $('#btnReport').on('click', function () {
        reportProject();
    });

    $('#btnSimpanProject').on('click', function () {
        var stack = $('#inputStack').val();
        var intArrStack = $.map(stack, function (value, index) {
            return parseInt(value, 10);
        });

        var data = {
            nama: $('#inputNamaProject').val(),
            // listBahasaPemrograman: $('#inputBahasaPemrograman').val(),
            // listJenisDatabase: $('#inputDatabase').val(),
            bisnisOwner: $('#inputBO').val(),
            versioning: $('#inputVersi').val(),
            ndRequest: $('#inputNd').val(),
            tglNd: $('#inputTglNd').val(),
            jenis: $('#inputJenis').val(),
            listStack: intArrStack
        };


        $('#addProjectModal').modal('hide');

        showLoading();

        $.ajax({
            url: "/api/project",
            type: "POST",
            headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            mimeType: 'application/json',

            success: function (data) {
                if (data.status == 1) {
                    swal.fire({
                        title: "SUKSES",
                        text: data.message,
                        icon: "success"
                    }).then(function () {
                        $('#tbRequestProject').DataTable().ajax.reload(null, false);
                        $('#formAddProject')[0].reset();
                        $('#inputBahasaPemrograman').val([]);
                        $('#inputDatabase').val([]);
                        $('#inputJenis').val(0);
                    });
                } else {
                    errorResult();
                }
            },
            error: function () {
                errorResult();
            }
        });


    });

    var tableRequestProject = function () {

        $('#tbRequestProject').DataTable({
            "ajax": {
                "url": "/api/project",
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
                    "data": "nama",
                    render: function (data, type, row, meta) {
                        var jenis;
                        switch (row.jenis) {
                            case 1:
                                jenis = 'Service API';
                                break;
                            case 2:
                                jenis = 'Mobile Apps';
                                break;
                            case 3:
                                jenis = 'Web Apps';
                                break;
                            case 4:
                                jenis = 'Desktop';
                                break;
                        }
                        return '<b>' + row.nama + '</b>' + '<br>' +
                            '<b>Jenis: </b>  ' + jenis + '<br>' +
                            '<b>ND Permintaan: </b>  ' + row.ndRequest;
                    },
                },
                {"data": "bisnisOwner"},
                {"data": "versioning"},
                {"data": "tglNd"},
                {
                    "data": "proses", "render": function (data) {
                        if (data == 0) {
                            return '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill"><b> DRAFT </b></span>';
                        } else if (data == 1) {
                            return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> PEMBENTUKAN TIM </b></span>';
                        } else if (data == 2) {
                            return '<span class="kt-badge  btn-warning"><b> PENGEMBANGAN </b></span>';
                        } else if (data == 3) {
                            return '<span class="kt-badge  btn-danger"><b> TESTING </b></span>';
                        } else if (data == 4) {
                            return '<span class="kt-badge btn-success"><b> DEPLOYMENT </b></span>';
                        } else {
                            return '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill"><b> ERROR </b></span>';
                        }
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {



                        if (row.proses == 1 ) {
                            return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="View" onclick="viewProject(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">' +
                                '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> ' +
                                '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>' +
                                '</svg></span>\n' +
                                '</button>';
                        }

                        if (row.proses > 1) {
                            return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="View" onclick="viewProject(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">' +
                                '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> ' +
                                '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>' +
                                '</svg></span>\n' +
                                '</button>\n' +
                                '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Surat Penugasan" onclick="viewSkepTim(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">\n' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '<path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor"></path>\n' +
                                '<path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor"></path>\n' +
                                '</svg></span>\n' +
                                '</button>';
                        }

                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="editProject(' + row['id'] + ')">\n' +
                            '      <span class="svg-icon svg-icon-3">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> ' +
                            ' <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>' +
                            '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>' +
                            '</svg>\n' +
                            '</span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm" title="Delete" onclick="hapusProject(' + row['id'] + ')">\n' +
                            '     <span class="svg-icon svg-icon-3"> ' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">' +
                            '<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>' +
                            '</svg>' +
                            '</span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-success btn-sm" title="Ajukan" onclick="ajukanProject(' + row['id'] + ')">\n' +
                            '<span class="svg-icon svg-icon-3"> \n' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-arrow-up" viewBox="0 0 16 16">\n' +
                            ' <path fill-rule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"></path>\n' +
                            '<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>\n' +
                            ' <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>\n' +
                            ' </svg>\n' +
                            '</span>\n' +
                            '</button>';
                    }
                }
            ]
        });
    }

    var tbListProjectAjukan = function () {

        $('#tbListProjectAjukan').DataTable({
            "ajax": {
                "url": "/api/project/proses/" + 1,
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
                    "data": "nama",
                    render: function (data, type, row, meta) {
                        var jenis;
                        switch (row.jenis) {
                            case 1:
                                jenis = 'Service API';
                                break;
                            case 2:
                                jenis = 'Mobile Apps';
                                break;
                            case 3:
                                jenis = 'Web Apps';
                                break;
                            case 4:
                                jenis = 'Desktop';
                                break;
                        }


                        return '<b>' + row.nama + '</b>' + '<br>' +
                            '<b>Jenis: </b>  ' + jenis + '<br>' +
                            '<b>ND Permintaan: </b>  ' + row.ndRequest;
                    },
                },
                {"data": "bisnisOwner"},
                {"data": "versioning"},
                {"data": "tglNd"},
                {
                    "data": "proses", "render": function (data) {
                        if (data == 0) {
                            return '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill"><b> DRAFT </b></span>';
                        } else if (data == 1) {
                            return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> PEMBENTUKAN TIM </b></span>';
                        } else if (data == 2) {
                            return '<span class="kt-badge  btn-warning"><b> PENGEMBANGAN </b></span>';
                        } else if (data == 3) {
                            return '<span class="kt-badge  btn-danger"><b> TESTING </b></span>';
                        } else if (data == 4) {
                            return '<span class="kt-badge btn-success"><b> DEPLOYMENT </b></span>';
                        } else {
                            return '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill"><b> ERROR </b></span>';
                        }
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {

                        var userAuthority = $('#roleSession').val();

                        if ((row.proses > 0 && row.proses <= 2) && userAuthority === 'ROLE_KEPALA_SEKSI') {
                            return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="View" onclick="viewProject(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">' +
                                '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> ' +
                                '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>' +
                                '</svg></span>\n' +
                                '</button>\n' +
                                '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Generate Team" onclick="generateTeam(' + row['id'] + ')">\n' +
                                '<span className="svg-icon svg-icon-3">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cpu" viewBox="0 0 16 16"> ' +
                                '<path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"> ' +
                                '</path>' +
                                '</svg>      ' +
                                '</span>' +
                                '</button>';
                        }


                    }
                }
            ]
        });
    }

    var tbListProjectKerjakan = function () {

        $('#tbListProjectKerjakan').DataTable({
            "ajax": {
                "url": "/api/project/proses/" + 2 + "/pegawai",
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
                    "data": "nama",
                    render: function (data, type, row, meta) {
                        var jenis;
                        switch (row.jenis) {
                            case 1:
                                jenis = 'Service API';
                                break;
                            case 2:
                                jenis = 'Mobile Apps';
                                break;
                            case 3:
                                jenis = 'Web Apps';
                                break;
                            case 4:
                                jenis = 'Desktop';
                                break;
                        }

                        return '<b>' + row.nama + '</b>' + '<br>' +
                            '<b>Jenis: </b>  ' + jenis + '<br>' +
                            '<b>ND Permintaan: </b>  ' + row.ndRequest;

                    },
                },
                {"data": "bisnisOwner"},
                {"data": "versioning"},
                {"data": "tglNd"},
                {
                    "data": "proses", "render": function (data) {
                        if (data == 0) {
                            return '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill"><b> DRAFT </b></span>';
                        } else if (data == 1) {
                            return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> PEMBENTUKAN TIM </b></span>';
                        } else if (data == 2) {
                            return '<span class="kt-badge  btn-warning"><b> PENGEMBANGAN </b></span>';
                        } else if (data == 3) {
                            return '<span class="kt-badge  btn-danger"><b> TESTING </b></span>';
                        } else if (data == 4) {
                            return '<span class="kt-badge btn-success"><b> DEPLOYMENT </b></span>';
                        } else {
                            return '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill"><b> ERROR </b></span>';
                        }
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {
                        var userAuthority = $('#roleSession').val();

                        if ((row.proses == 2) && userAuthority === 'ROLE_PROGRAMMER') {
                            return '<button class="btn btn-icon btn-bg-light btn-active-color-success btn-sm" title="Ajukan Deployment" onclick="ajukanDeployment(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3"> \n' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-arrow-up" viewBox="0 0 16 16">\n' +
                                ' <path fill-rule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"></path>\n' +
                                '<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>\n' +
                                ' <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>\n' +
                                ' </svg>\n' +
                                '</span>\n' +
                                '</button>' +
                                '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="View" onclick="viewProject(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">' +
                                '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> ' +
                                '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>' +
                                '</svg></span>\n' +
                                '</button>\n' +
                                '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Surat Penugasan" onclick="viewSkepTim(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">\n' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '<path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor"></path>\n' +
                                '<path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor"></path>\n' +
                                '</svg></span>\n' +
                                '</button>';
                        }


                    }
                }
            ]
        });
    }

    var tbMonitoringProject = function () {
        $('#tbMonitoringProject').DataTable({
            "ajax": {
                "url": "/api/project",
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
                    "data": "nama",
                    render: function (data, type, row, meta) {
                        var jenis;
                        switch (row.jenis) {
                            case 1:
                                jenis = 'Service API';
                                break;
                            case 2:
                                jenis = 'Mobile Apps';
                                break;
                            case 3:
                                jenis = 'Web Apps';
                                break;
                            case 4:
                                jenis = 'Desktop';
                                break;
                        }


                        return '<b>' + row.nama + '</b>' + '<br>' +
                            '<b>Jenis: </b>  ' + jenis + '<br>' +
                            '<b>ND Permintaan: </b>  ' + row.ndRequest;
                    },
                },
                {
                    "data": null,
                    render: function (data, type, row, meta) {
                        return 'Sistem Analis :' + '<b>' + row.tbPegawaiAnalis.nama + '</b>' + '<br>' + 'Tim:  ' +
                            '<ul>' + row.tim.map(function (item) {
                                return '<li>' + item.tbPegawai.nama + '</li>';
                            }).join('') + '</ul>';
                    }
                },
                {"data": "bisnisOwner"},
                {"data": "versioning"},
                {"data": "tglNd"},
                {
                    "data": "proses", "render": function (data) {
                        if (data == 0) {
                            return '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill"><b> DRAFT </b></span>';
                        } else if (data == 1) {
                            return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> PEMBENTUKAN TIM </b></span>';
                        } else if (data == 2) {
                            return '<span class="kt-badge  btn-warning"><b> PENGEMBANGAN </b></span>';
                        } else if (data == 3) {
                            return '<span class="kt-badge  btn-danger"><b> TESTING </b></span>';
                        } else if (data == 4) {
                            return '<span class="kt-badge btn-success"><b> DEPLOYMENT </b></span>';
                        } else {
                            return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> ERROR </b></span>';
                        }
                    }
                },


            ]
        });
    }

    var tbReportProject = function () {
        var userAuthority = $('#roleSession').val();

        if (userAuthority === 'ROLE_PROGRAMMER') {
            console.log('masuk programmer');
            $('#tbReportProject').DataTable({
                "ajax": {
                    "url": "/api/project/proses/" + 0 + "/pegawai",
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
                        "data": "nama",
                        render: function (data, type, row, meta) {
                            var jenis;
                            switch (row.jenis) {
                                case 1:
                                    jenis = 'Service API';
                                    break;
                                case 2:
                                    jenis = 'Mobile Apps';
                                    break;
                                case 3:
                                    jenis = 'Web Apps';
                                    break;
                                case 4:
                                    jenis = 'Desktop';
                                    break;
                            }


                            return '<b>' + row.nama + '</b>' + '<br>' +
                                '<b>Jenis: </b>  ' + jenis + '<br>' +
                                '<b>ND Permintaan: </b>  ' + row.ndRequest;
                        },
                    },
                    {
                        "data": null,
                        render: function (data, type, row, meta) {
                            return 'Sistem Analis :' + '<b>' + row.tbPegawaiAnalis.nama + '</b>' + '<br>' + 'Tim:  ' +
                                '<ul>' + row.tim.map(function (item) {
                                    return '<li>' + item.tbPegawai.nama + '</li>';
                                }).join('') + '</ul>';
                        }
                    },
                    {"data": "bisnisOwner"},
                    {"data": "versioning"},
                    {"data": "tglNd"},
                    {
                        "data": "proses", "render": function (data) {
                            if (data == 0) {
                                return '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill"><b> DRAFT </b></span>';
                            } else if (data == 1) {
                                return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> PEMBENTUKAN TIM </b></span>';
                            } else if (data == 2) {
                                return '<span class="kt-badge  btn-warning"><b> PENGEMBANGAN </b></span>';
                            } else if (data == 3) {
                                return '<span class="kt-badge  btn-danger"><b> TESTING </b></span>';
                            } else if (data == 4) {
                                return '<span class="kt-badge btn-success"><b> DEPLOYMENT </b></span>';
                            } else {
                                return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> ERROR </b></span>';
                            }
                        }
                    },


                ]
            });
        }
        else{
            $('#tbReportProject').DataTable({
                "ajax": {
                    "url": "/api/project",
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
                        "data": "nama",
                        render: function (data, type, row, meta) {
                            var jenis;
                            switch (row.jenis) {
                                case 1:
                                    jenis = 'Service API';
                                    break;
                                case 2:
                                    jenis = 'Mobile Apps';
                                    break;
                                case 3:
                                    jenis = 'Web Apps';
                                    break;
                                case 4:
                                    jenis = 'Desktop';
                                    break;
                            }


                            return '<b>' + row.nama + '</b>' + '<br>' +
                                '<b>Jenis: </b>  ' + jenis + '<br>' +
                                '<b>ND Permintaan: </b>  ' + row.ndRequest;
                        },
                    },
                    {
                        "data": null,
                        render: function (data, type, row, meta) {
                            return 'Sistem Analis :' + '<b>' + row.tbPegawaiAnalis.nama + '</b>' + '<br>' + 'Tim:  ' +
                                '<ul>' + row.tim.map(function (item) {
                                    return '<li>' + item.tbPegawai.nama + '</li>';
                                }).join('') + '</ul>';
                        }
                    },
                    {"data": "bisnisOwner"},
                    {"data": "versioning"},
                    {"data": "tglNd"},
                    {
                        "data": "proses", "render": function (data) {
                            if (data == 0) {
                                return '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill"><b> DRAFT </b></span>';
                            } else if (data == 1) {
                                return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> PEMBENTUKAN TIM </b></span>';
                            } else if (data == 2) {
                                return '<span class="kt-badge  btn-warning"><b> PENGEMBANGAN </b></span>';
                            } else if (data == 3) {
                                return '<span class="kt-badge  btn-danger"><b> TESTING </b></span>';
                            } else if (data == 4) {
                                return '<span class="kt-badge btn-success"><b> DEPLOYMENT </b></span>';
                            } else {
                                return '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"><b> ERROR </b></span>';
                            }
                        }
                    },


                ]
            });
        }


    }


    return {
        init: function () {
            tableRequestProject();
            tbListProjectAjukan();
            tbListProjectKerjakan();
            tbMonitoringProject();
            tbReportProject();
        },
    };

}();

jQuery(document).ready(function () {
    project.init();
});

function hapusProject(id) {
    swal.fire({
        title: "Delete Project?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: 'No',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: 'btn btn-light'
        }
    }).then(function (e) {
        if (e.isConfirmed === true) {
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/api/project/" + id,
                type: "delete",
                headers: {"X-CSRF-TOKEN": token},
                success: function (data) {
                    if (data.status == 1) {
                        swal.fire({
                            title: "SUKSES",
                            text: data.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tbRequestProject').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function ajukanProject(id) {
    swal.fire({
        title: "Ajukan Project?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Yes, Ajukan",
        cancelButtonText: 'No',
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: 'btn btn-light'
        }
    }).then(function (e) {
        if (e.isConfirmed === true) {
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/api/project/ajukan/" + id,
                type: "put",
                headers: {"X-CSRF-TOKEN": token},
                success: function (data) {
                    if (data.status == 1) {
                        swal.fire({
                            title: "SUKSES",
                            text: data.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tbRequestProject').DataTable().ajax.reload(null, false);
                        });
                    } else if (data.status == 0) {
                        swal.fire({
                            title: "GAGAL",
                            text: data.message,
                            icon: "failed",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tbRequestProject').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function ajukanDeployment(id) {
    swal.fire({
        title: "Ajukan Project?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Yes, Ajukan",
        cancelButtonText: 'No',
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: 'btn btn-light'
        }
    }).then(function (e) {
        if (e.isConfirmed === true) {
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/api/project/deployment/" + id,
                type: "put",
                headers: {"X-CSRF-TOKEN": token},
                success: function (data) {
                    if (data.status == 1) {
                        swal.fire({
                            title: "SUKSES",
                            text: data.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tbListProjectKerjakan').DataTable().ajax.reload(null, false);
                        });
                    } else if (data.status == 0) {
                        swal.fire({
                            title: "GAGAL",
                            text: data.message,
                            icon: "failed",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tbRequestProject').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function viewProject(id) {
    var token = $("meta[name='_csrf']").attr("content");
    $.ajax({
        url: "/api/project/" + id,
        type: "get",
        headers: {"X-CSRF-TOKEN": token},
        success: function (data) {
            if (data.status == 1) {
                // var bahasaPemrogramanId = data.data.bahasaPemrograman.map(function (item) {
                //     return item.bahasaPemrograman.id;
                // });
                //
                // var databaseId = data.data.jenisDatabase.map(function (item) {
                //     return item.jenisDatabase.id;
                // });


                var date = new Date(data.data.tglNd);
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var formattedDate = day + "-" + month + "-" + date.getFullYear();

                if (data.data.stack == null) {
                    data.data.stack = [];
                }

                var arrayStack = data.data.stack;
                arrayStack = arrayStack.substring(1, arrayStack.length - 1); // remove brackets
                var strArrayStack = arrayStack.split(", ");
                var intArrayStack = $.map(strArrayStack, function (value, index) {
                    return parseInt(value, 10);
                });


                $('#viewNamaProject').val(data.data.nama).prop('disabled', true);
                // $('#viewBahasaPemrograman').val(bahasaPemrogramanId).change().prop('disabled', true);
                // $('#viewDatabase').val(databaseId).change().prop('disabled', true);
                $('#viewBO').val(data.data.bisnisOwner).prop('disabled', true);
                $('#viewVersi').val(data.data.versioning).prop('disabled', true);
                $('#viewNd').val(data.data.ndRequest).prop('disabled', true);
                $('#viewTglNd').val(formattedDate).prop('disabled', true);
                $('#viewJenis').val(data.data.jenis).change().prop('disabled', true);
                $('#viewStack').val(intArrayStack).change().prop('disabled', true);
            } else {
                errorResult();
            }
        }
    });
    $('#viewProjectModal').modal('show');
}

function editProject(id) {
    var token = $("meta[name='_csrf']").attr("content");
    $.ajax({
        url: "/api/project/" + id,
        type: "get",
        headers: {"X-CSRF-TOKEN": token},
        success: function (data) {
            if (data.status == 1) {
                // var bahasaPemrogramanId = data.data.bahasaPemrograman.map(function (item) {
                //     return item.bahasaPemrograman.id;
                // });
                //
                // var databaseId = data.data.jenisDatabase.map(function (item) {
                //     return item.jenisDatabase.id;
                // });

                var date = new Date(data.data.tglNd);
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var formattedDate = day + "-" + month + "-" + date.getFullYear();


                var arrayStack = data.data.stack;
                arrayStack = arrayStack.substring(1, arrayStack.length - 1); // remove brackets
                var strArrayStack = arrayStack.split(", ");
                var intArrayStack = $.map(strArrayStack, function (value, index) {
                    return parseInt(value, 10);
                });


                $('#editNamaProject').val(data.data.nama);
                // $('#editBahasaPemrograman').val(bahasaPemrogramanId).change();
                // $('#editDatabase').val(databaseId).change();
                $('#editStack').val(intArrayStack).change();
                $('#editBO').val(data.data.bisnisOwner);
                $('#editVersi').val(data.data.versioning);
                $('#editNd').val(data.data.ndRequest);
                $('#editTglNd').val(formattedDate);
                $('#editJenis').val(data.data.jenis).change();
            } else {
                errorResult();
            }
        }
    });
    $('#editProjectModal').modal('show');


    $('#btnEditProject').on('click', function () {
        var stack = $('#editStack').val();
        var intArrStack = $.map(stack, function (value, index) {
            return parseInt(value, 10);
        });


        var data = {
            nama: $('#editNamaProject').val(),
            listBahasaPemrograman: $('#editBahasaPemrograman').val(),
            listJenisDatabase: $('#editDatabase').val(),
            bisnisOwner: $('#editBO').val(),
            versioning: $('#editVersi').val(),
            ndRequest: $('#editNd').val(),
            tglNd: $('#editTglNd').val(),
            jenis: $('#editJenis').val(),
            listStack: intArrStack
        };

        $('#editProjectModal').modal('hide');

        showLoading();

        $.ajax({
            url: "/api/project/" + id,
            type: "put",
            headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            mimeType: 'application/json',

            success: function (data) {
                if (data.status == 1) {
                    swal.fire({
                        title: "SUKSES",
                        text: data.message,
                        icon: "success"
                    }).then(function () {
                        $('#tbRequestProject').DataTable().ajax.reload(null, false);
                        $('#formEditProject')[0].reset();
                        // $('#editBahasaPemrograman').val([]);
                        // $('#editDatabase').val([]);
                        $('#editStack').val([]);
                        $('#editJenis').val(0);
                    });
                } else {
                    errorResult();
                }
            },
            error: function () {
                errorResult();
            }
        });
    });
}

function generateTeam(id) {

    $('#tbPerhitunganSAW').DataTable({
        "ajax": {
            "url": "/api/project/perhitungan/" + id,
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
                "data": "idPegawai",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "null",
                render: function (data, type, row, meta) {
                    return row.tbPegawai.nama;
                },
            },
            {
                "data": "null",
                render: function (data, type, row, meta) {
                    return row.tbPegawai.nip;
                },
            },
            {
                "data": "null",
                render: function (data, type, row, meta) {
                    return row.tbPegawai.jabatan;
                },
            },
            {
                "data": "perhitunganAlternatif"
            },
            {
                "data": "perhitunganAlternatif",
                render: function (data, type, row, meta) {
                    var color = getColor(data);

                    if (data > 0.7) {
                        return '<span style="color:' + color + ';">' + 'Sangat sesuai' + '</span>';
                    } else if (data > 0.5 && data <= 0.7) {
                        return '<span style="color:' + color + ';">' + 'Sesuai' + '</span>';
                    } else if (data > 0.3 && data <= 0.5) {
                        return '<span style="color:' + color + ';">' + 'Kurang Sesuai' + '</span>';
                    } else if (data <= 0.3) {
                        return '<span style="color:' + color + ';">' + 'Tidak Sesuai' + '</span>';
                    } else {
                        return '<span style="color:' + color + ';">' + Error + '</span>';
                    }


                },
            }


        ],

        columnDefs: [
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input class="CheckBox" type="checkbox" id="idCbGenerate" value="' + row.idPegawai + '"/><span></span></label>';
                },
            },

        ],
    });


    $(document).on("change", "input[id='checkbox_all']", function () {
        if (this.checked) {
            $('.CheckBox').prop('checked', true);
        } else {
            $('.CheckBox').prop('checked', false);
        }
    });

    $(document).on("change", "input[type=checkbox]", function () {
        if (this.checked) {
            $('#btnGenerateTeam').removeAttr("disabled");
        }

        var value = $('input[class="CheckBox"]:checked').map(function () {
            return $(this).val();
        }).get();

        if (value == '') {
            $("#btnGenerateTeam").attr("disabled", true);
        }

        $('#btnGenerateTeam').unbind("click").click(function (e) {
            e.preventDefault();

            var stringArray = value;
            var listIdPegawai = $.map(stringArray, function (value, index) {
                return parseInt(value, 10);
            });

            btnGenerateTeam(id, listIdPegawai);

        });

    });


    $('#btnPrintTim').on('click', function () {
        reportPegawai(id);
    });

    $('#teamProjectModal').modal('show');
}

function viewSkepTim(id) {

    Swal.fire({
        title: "Mohon Menunggu",
        text: "Data sedang diproses...",
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    Swal.showLoading();

    $.ajax({
        url: '/api/project/'+id+'/generate-skep',
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var blob = new Blob([data], {type: 'application/pdf'});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "surat_penugasan_tim.pdf";

            var reader = new FileReader();
            reader.onloadend = function() {
                $('#skepProjectModal .modal-body').html('<iframe width="100%" height="500" src="' + reader.result + '"></iframe>');
                $('#skepProjectModal').modal('show');
                Swal.close();
            }
            reader.readAsDataURL(blob);
        }
    });
}

function btnGenerateTeam(id, val) {

    swal.fire({
        title: "Generate Team?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Yes, Generate",
        cancelButtonText: 'No',
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: 'btn btn-light'
        }
    }).then(function (e) {
        if (e.isConfirmed === true) {
            showLoading();
            var token = $("meta[name='_csrf']").attr("content");
            $.ajax({
                url: "/api/project/" + id + "/generate-tim",
                type: "post",
                traditional: true,
                data: {
                    'idPegawais': val
                },
                headers: {"X-CSRF-TOKEN": token},
                success: function (data) {
                    if (data.status == 1) {
                        swal.fire({
                            title: "SUKSES",
                            text: data.message,
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#teamProjectModal').modal('hide');
                            $('#tbListProjectAjukan').DataTable().ajax.reload(null, false);
                        });
                    } else if (data.status == 0) {
                        swal.fire({
                            title: "GAGAL",
                            text: data.message,
                            icon: "failed",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#teamProjectModal').modal('hide');
                            $('#tbListProjectAjukan').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function getColor(value) {
    //value from 0 to 1
    var hue = ((value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}

function reportProject (){
   var tglAwal =  $('#tglAwal').val();
   var tglAkhir = $('#tglAkhir').val();

    Swal.fire({
        title: "Mohon Menunggu",
        text: "Data sedang diproses...",
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    Swal.showLoading();
    $.ajax({
        url: '/api/project/generate-report',
        method: 'GET',
        traditional : true,
        data :{
            tglAwal : tglAwal,
            tglAkhir : tglAkhir
        },
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var blob = new Blob([data], {type: 'application/pdf'});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "report_project.pdf";

            var reader = new FileReader();
            reader.onloadend = function() {
                $('#reportModal .modal-body').html('<iframe width="100%" height="500" src="' + reader.result + '"></iframe>');
                $('#reportModal').modal('show');
                Swal.close();
            }
            reader.readAsDataURL(blob);
        }
    });
}

function reportPegawai(id) {
    Swal.fire({
        title: "Mohon Menunggu",
        text: "Data sedang diproses...",
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    Swal.showLoading();
    $.ajax({
        url: '/api/project/generate-report-pegawai/' + id,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var blob = new Blob([data], {type: 'application/pdf'});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "report_project.pdf";

            var reader = new FileReader();
            reader.onloadend = function() {
                $('#reportPegawaiModal .modal-body').html('<iframe width="100%" height="500" src="' + reader.result + '"></iframe>');
                $('#reportPegawaiModal').modal('show');
                Swal.close();
            }
            reader.readAsDataURL(blob);
        }
    });
}
