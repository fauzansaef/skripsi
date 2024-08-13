"use strict";
var manajemen = function () {

    $('#btnAddKriteria').on('click', function () {
        $('#addKriteriaModal').modal('show');
    });


    $('#btnSimpanKriteria').on('click', function () {

        var idPegawai = $('#inputNamaDeveloper').val();
        var skillLevel = $('#inputSkillProgramming').val();
        var stack = $('#inputStack').val();
        var pelatihan = $('#inputPelatihan').val();


        var intArrStack = $.map(stack, function (value, index) {
            return parseInt(value, 10);
        });

        var intArrPelatihan = $.map(pelatihan, function (value, index) {
            return parseInt(value, 10);
        });


        var data = {
            idPegawai: idPegawai,
            kemampuanCoding: skillLevel,
            jumlahPelatihan: intArrPelatihan,
            penguasaanStack: intArrStack
        };

        $('#addKriteriaModal').modal('hide');
        showLoading();

        $.ajax({
            url: "/api/kriteria-pegawai",
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
                        $('#tbKriteriaPegawai').DataTable().ajax.reload(null, false);
                        $('#formAddKriteria')[0].reset();
                        $('#inputNamaDeveloper').val(0);
                        $('#inputPelatihan').val([]);
                        $('#inputStack').val([]);
                        $('#inputNamaDeveloper').val(0);
                    });
                } else {
                    swal.fire({
                        title: "ERROR",
                        text: data.message,
                        icon: "error",
                        customClass: {
                            confirmButton: "btn btn-danger"
                        }
                    })
                }
            },
            error: function () {
                errorResult();
            }
        });
    });

    var tableKriteriaPegawai = function () {

        $('#tbKriteriaPegawai').DataTable({
            "ajax": {
                "url": "/api/kriteria-pegawai",
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
                {"data": "namaPegawai"},
                {"data": "lvlKemampuanCoding"},
                {
                    "data": "listPelatihan", render: function (data) {
                        var ul = '<ul>';
                        for(var i = 0; i < data.length; i++) {
                            ul += '<li>' + data[i] + '</li>';
                        }
                        ul += '</ul>';
                        return ul;
                    }
                },
                {"data": "jumlahPengalaman"},
                {"data": "jumlahProjectOngoing"},
                {
                    "data": "listStack", render: function (data) {
                        var ul = '<ul>';
                        for(var i = 0; i < data.length; i++) {
                            ul += '<li>' + data[i] + '</li>';
                        }
                        ul += '</ul>';
                        return ul;
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {

                        if (row.proses > 0) {
                            return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="View" onclick="viewProject(' + row['id'] + ')">\n' +
                                '<span class="svg-icon svg-icon-3">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">' +
                                '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> ' +
                                '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>' +
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

    return {
        init: function () {
            tableKriteriaPegawai();
        },
    };
}();

jQuery(document).ready(function () {
    manajemen.init();
});