"use strict";

var KTDatatablePortofolioAplikasi = function () {

    var handlePortofolioAplikasi = function () {
        var tabelPortofolioAplikasi = $('#tabelPortofolioAplikasi').DataTable({
            "ajax": {
                "url": "/rest-portofolio/listportofolio",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.status = $('#cariSeksiMonitoringProses').val() !== "" ?
                        $('#cariSeksiMonitoringProses').val() : null;
                    d.probis = $('#cariStatusMonitoringProses').val() !== "" ?
                        $('#cariStatusMonitoringProses').val() : null;
                    d.kelompok = $('#cariTahunMonitoringProses').val() !== "" ?
                        $('#cariTahunMonitoringProses').val() : null;
                }
            },
            "scrollX": true,
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
                {"data": "id_porto",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama_app"},
                {"data": "status_app"},
                {"data": "proses_bisnis"},
                {
                    data: 'modulPortofolioAplikasi',
                    render: function(data, type, row) {
                        var modulList = '<ul>';
                        $.each(data, function(index, modulItem) {
                            modulList +=
                                modulItem.ceklist_ctas == 1 ?
                                    '<li>'+modulItem.nama_modul+' | <svg style="color: rgb(30, 138, 0);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"> <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="#1e8a00"></path> </svg></li>' :
                                    '<li>'+modulItem.nama_modul+' | <svg style=\"color: rgb(225, 9, 9);\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\"> <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" fill=\"#e10909\"></path> </svg></li>'
                                ;
                        });
                        modulList += '</ul>';
                        return modulList;
                    }
                },
                {"data": "kelompok"},
                {"data": "bahasa_pemrograman"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return 'Seksi - '+row['seksi_pengembang']+' <br>Pengembang - '+row['pic_pengembang']+'<br><i>Penguji - '+row['pic_penguji']+'</i>';
                    }},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        var ldap = row['ldap_sikka'] == 1 ? 'LDAP_SIKKA&nbsp;&nbsp;&nbsp;<svg style="color: rgb(30, 138, 0);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"> <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="#1e8a00"></path> </svg>' : "LDAP_SIKKA&nbsp;&nbsp;&nbsp;<svg style=\"color: rgb(225, 9, 9);\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\"> <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" fill=\"#e10909\"></path> </svg> ";;
                        var djponline = row['djponline'] == 1 ? 'DJPONLINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<svg style="color: rgb(30, 138, 0);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"> <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="#1e8a00"></path> </svg>' : "DJPONLINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<svg style=\"color: rgb(225, 9, 9);\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\"> <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" fill=\"#e10909\"></path> </svg> ";;
                        var djpconnect = row['djpconnect'] == 1 ? 'DJPCONNECT<svg style="color: rgb(30, 138, 0);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"> <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="#1e8a00"></path> </svg>' : "DJPCONNECT<svg style=\"color: rgb(225, 9, 9);\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\"> <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" fill=\"#e10909\"></path> </svg> ";;
                        return ldap+'<br>'+djponline+'<br>'+djpconnect;
                    }},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['gitlab']){
                            // return row['gitlab'];
                            return '<button data-toggle="modal" title="Gitlab" data-bs-toggle="modal" data-bs-target="#modalGitlab" data-idporto="' + row['id_porto'] + '" data-gitlab="' + row['gitlab'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                                '<svg style="color: rgb(235, 137, 0);" xmlns="http://www.w3.org/2000/svg" width="24"'+
                                '    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'+
                                '    stroke-linecap="round" stroke-linejoin="round" className="feather feather-gitlab">'+
                                '  <path'+
                                '      d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"'+
                                '     fill="#eb8900"></path>' +
                                '  </svg>' +
                                '</button>';
                        }else{
                            return '-';
                        }
                    }},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToDetailPortofolioAplikasi('+row['id_porto']+')">\n ' +
                            ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg> ' +
                            '</button>\n';
                    }
                }
            ]
        });

        if ($('#cariTabelMonitoringProses').length > 0) {
            var filterSearch = document.querySelector('[data-monitoringproses="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelPortofolioAplikasi.search(e.target.value).draw();
            });
        }
    };


    var handleEditPortofolioAplikasi = function () {
        $("#formEditPortofolioAplikasi").validate({
            rules: {
                inputNamaAplikasi: {required: true},
                inputModul: {required: true},
                inputSeksi: {required: true},
                inputPengembang: {required: true},
                inputPenguji: {required: true},
                inputStatus: {required: true},
                inputProsesBisnis: {required: true},
                inputKelompok: {required: true},
                inputBahasa: {required: true},
                inputAlamatAplikasi: {required: true},
            },

            submitHandler: function () {
                showLoading();

                var portofolioAplikasiDetails = {
                    id_porto: $('#idPorto').val(),
                    nama_app: $('#inputNamaAplikasi').val(),
                    modul_dan_fungsi: $('#inputModul').val(),
                    seksi_pengembang: $('#inputSeksi').val(),
                    pic_pengembang: $('#inputPengembang').val(),
                    pic_penguji: $('#inputPenguji').val(),
                    status_app: $('#inputStatus').val(),
                    proses_bisnis: $('#inputProsesBisnis').val(),
                    kelompok: $('#inputKelompok').val(),
                    bahasa_pemrograman: $('#inputBahasa').val(),
                    gitlab: $('#inputGitlab').val(),
                    domain_name: $('#inputAlamatAplikasi').val(),
                    ldap_sikka: $('#inputLdap').is(':checked') ? 1 : 0,
                    djponline: $('#inputDjponline').is(':checked') ? 1 : 0,
                    djpconnect: $('#inputDjpconnect').is(':checked') ? 1 : 0
                };

                $.ajax({
                    url: "/rest-portofolio/editportofolio",
                    type: "put",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: JSON.stringify(portofolioAplikasiDetails),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                window.location.href = "/portofolio/list";
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

    var handletambahPortofolioAplikasi = function () {
        $("#formTambahPortofolioAplikasi").validate({
            rules: {
                inputNamaAplikasi: {required: true},
                inputModul: {required: true},
                inputSeksi: {required: true},
                inputPengembang: {required: true},
                inputPenguji: {required: true},
                inputStatus: {required: true},
                inputProsesBisnis: {required: true},
                inputKelompok: {required: true},
                inputBahasa: {required: true},
                inputAlamatAplikasi: {required: true},
            },

            submitHandler: function () {
                showLoading();

                var portofolioAplikasi = {
                    nama_app: $('#inputNamaAplikasi').val(),
                    modul_dan_fungsi: $('#inputModul').val(),
                    seksi_pengembang: $('#inputSeksi').val(),
                    pic_pengembang: $('#inputPengembang').val(),
                    pic_penguji: $('#inputPenguji').val(),
                    status_app: $('#inputStatus').val(),
                    proses_bisnis: $('#inputProsesBisnis').val(),
                    kelompok: $('#inputKelompok').val(),
                    gitlab: $('#inputGitlab').val(),
                    bahasa_pemrograman: $('#inputBahasa').val(),
                    domain_name: $('#inputAlamatAplikasi').val(),
                    ldap_sikka: $('#inputLdap').is(':checked') ? 1 : 0,
                    djponline: $('#inputDjponline').is(':checked') ? 1 : 0,
                    djpconnect: $('#inputDjpconnect').is(':checked') ? 1 : 0
                };


                $.ajax({
                    url: "/rest-portofolio/simpanportofolio",
                    type: "post",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: JSON.stringify(portofolioAplikasi),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                window.location.href = "/portofolio/list";
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
            handlePortofolioAplikasi();
            handleEditPortofolioAplikasi();
            handletambahPortofolioAplikasi();
        }
    };

}();


var KTDatatableModulPortofolioAplikasi = function () {

    var handleModulPortofolioAplikasi = function () {
        var tabelModulPortofolioAplikasi = $('#tabelModulAplikasi').DataTable({
            "ajax": {
                "url": "/rest-portofolio/listmodulportofolio",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.id_porto = $('#idPorto').val() !== "" ?
                        $('#idPorto').val() : null;
                }
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
                {"data": "id_modulporto",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "nama_modul"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        var ctas = row['ceklist_ctas'] == 1 ? '<svg style="color: rgb(30, 138, 0);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"> <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="#1e8a00"></path> </svg>' : "<svg style=\"color: rgb(225, 9, 9);\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\"> <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" fill=\"#e10909\"></path> </svg> ";
                        return ctas;
                    }},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button data-toggle="modal" title="Edit" data-bs-toggle="modal" data-bs-target="#modalEditModul" data-idmodul="' + row['id_modulporto'] + '" data-namamodul="' + row['nama_modul'] + '" data-ctas="' + row['ceklist_ctas'] + '" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">' +
                            '<span class="svg-icon svg-icon-3">\n' +
                            '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '        <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '        <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '   </svg>\n' +
                            '</span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusModulPorto('+row['id_modulporto']+')">' +
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

        // if ($('#cariTabelMonitoringProses').length > 0) {
        //     var filterSearch = document.querySelector('[data-monitoringproses="search"]');
        //     filterSearch.addEventListener('keyup', function (e) {
        //         tabelPortofolioAplikasi.search(e.target.value).draw();
        //     });
        // }
    };


    var handleEditModulAplikasi = function () {
        $("#formEditModul").validate({
            rules: {
                editNamaModulAplikasi: {required: true}
            },

            submitHandler: function () {
                showLoading();

                var modulPortofolioAplikasiDetails = {
                    id_modulporto: $('#idModul').val(),
                    nama_modul: $('#editNamaModulAplikasi').val(),
                    ceklist_ctas: $('#editCtas').is(':checked') ? 1 : 0
                };

                $.ajax({
                    url: "/rest-portofolio/editmodulportofolio",
                    type: "put",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: JSON.stringify(modulPortofolioAplikasiDetails),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelModulAplikasi').DataTable().ajax.reload(null, false);
                                $('#modalEditModul').modal('hide');
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

    var handletambahModulPortofolioAplikasi = function () {
        $("#formEditModulPortofolioAplikasi").validate({
            rules: {
                inputNamaModulAplikasi: {required: true}
            },

            submitHandler: function () {
                showLoading();

                var modulPortofolioAplikasi = {
                    nama_modul: $('#inputNamaModulAplikasi').val(),
                    ceklist_ctas: $('#inputCtas').is(':checked') ? 1 : 0,
                    id_porto: $('#idPortonya').val()
                };

                $.ajax({
                    url: "/rest-portofolio/simpanmodulportofolio",
                    type: "post",
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: JSON.stringify(modulPortofolioAplikasi),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#tabelModulAplikasi').DataTable().ajax.reload(null, false);
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
            handleModulPortofolioAplikasi();
            handletambahModulPortofolioAplikasi();
            handleEditModulAplikasi();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatablePortofolioAplikasi.init();
    KTDatatableModulPortofolioAplikasi.init();
});

function goToTambahPortofolioAplikasi() {
    window.location.href = window.location.origin + "/portofolio/tambah";
}

function searchTablePortofolioAplikasi() {
    $('#tabelPortofolioAplikasi').DataTable().ajax.reload(null, false);
}

$('#modalEditModul').on('show.bs.modal', function (event) {
    var idmodul = $(event.relatedTarget).data('idmodul');
    var namamodul = $(event.relatedTarget).data('namamodul');
    var ctas = $(event.relatedTarget).data('ctas');

    $(this).find('#idModul').val(idmodul);
    $(this).find('#editNamaModulAplikasi').val(namamodul);

    if(ctas == 1) {
        $(this).find('#editCtas').prop('checked', true);
    } else {
        $(this).find('#editCtas').prop('checked', false);
    }
});


$('#modalGitlab').on('show.bs.modal', function (event) {
    var idporto = $(event.relatedTarget).data('idporto');
    var gitlab = $(event.relatedTarget).data('gitlab');

    $(this).find('#gitlab').val(gitlab);
});

function hapusModulPorto(id) {
    swal.fire({
        title: "Hapus Modul?",
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
                url: "/rest-portofolio/hapusmodulportofolio",
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
                            $('#tabelModulAplikasi').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

var KTCardsWidget19 = {
    init: function() {
        !function() {
            var e = document.getElementById("kt_card_widget_19_chart");
            if (e) {
                var t = {
                    size: e.getAttribute("data-kt-size") ? parseInt(e.getAttribute("data-kt-size")) : 70,
                    lineWidth: e.getAttribute("data-kt-line") ? parseInt(e.getAttribute("data-kt-line")) : 11,
                    rotate: e.getAttribute("data-kt-rotate") ? parseInt(e.getAttribute("data-kt-rotate")) : 145
                }
                    , a = document.createElement("canvas")
                    , l = document.createElement("span");
                "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(a);
                var r = a.getContext("2d");
                a.width = a.height = t.size,
                    e.appendChild(l),
                    e.appendChild(a),
                    r.translate(t.size / 2, t.size / 2),
                    r.rotate((t.rotate / 180 - .5) * Math.PI);
                var o = (t.size - t.lineWidth) / 2
                    , i = function(e, t, a) {
                    a = Math.min(Math.max(0, a || 1), 1),
                        r.beginPath(),
                        r.arc(0, 0, o, 0, 2 * Math.PI * a, !1),
                        r.strokeStyle = e,
                        r.lineCap = "round",
                        r.lineWidth = t,
                        r.stroke()
                };
                i("#E4E6EF", t.lineWidth, 1),
                    i(KTUtil.getCssVariableValue("--bs-success"), t.lineWidth, (totalAppPspmPercentage/100)+(totalAppPspp1Percentage/100)),
                    i(KTUtil.getCssVariableValue("--bs-primary"), t.lineWidth, (totalAppPspp1Percentage/100))
            }
        }()
    }
};
"undefined" != typeof module && (module.exports = KTCardsWidget19),
    KTUtil.onDOMContentLoaded((function() {
            KTCardsWidget19.init()
        }
    ));

var KTChartsWidget19 = {
    init: function() {
        !function() {
            if ("undefined" != typeof am5) {
                var e = document.getElementById("kt_charts_widget_19_chart_1");
                if (e) {
                    var t, a = function() {
                        (t = am5.Root.new(e)).setThemes([am5themes_Animated.new(t)]);
                        var a = t.container.children.push(am5radar.RadarChart.new(t, {
                            panX: !1,
                            panY: !1,
                            wheelX: "panX",
                            wheelY: "zoomX",
                            innerRadius: am5.percent(20),
                            startAngle: -90,
                            endAngle: 180
                        }))
                            , l = [{
                            category: "PSPP 2",
                            value: totalAppPspp2GitPercentage,
                            full: 100,
                            columnSettings: {
                                fillOpacity: 1,
                                fill: am5.color(KTUtil.getCssVariableValue("--bs-info"))
                            }
                        }, {
                            category: "PSPP 1",
                            value: totalAppPspp1GitPercentage,
                            full: 100,
                            columnSettings: {
                                fillOpacity: 1,
                                fill: am5.color(KTUtil.getCssVariableValue("--bs-danger"))
                            }
                        }, {
                            category: "PSPM",
                            value: totalAppPspmGitPercentage,
                            full: 100,
                            columnSettings: {
                                fillOpacity: 1,
                                fill: am5.color(KTUtil.getCssVariableValue("--bs-primary"))
                            }
                        }, {
                            category: "Total Project on Gitlab",
                            value: totalAppGitPercentage,
                            full: 100,
                            columnSettings: {
                                fillOpacity: 1,
                                fill: am5.color(KTUtil.getCssVariableValue("--bs-success"))
                            }
                        }];
                        a.set("cursor", am5radar.RadarCursor.new(t, {
                            behavior: "zoomX"
                        })).lineY.set("visible", !1);
                        var r = am5radar.AxisRendererCircular.new(t, {});
                        r.labels.template.setAll({
                            radius: 10
                        }),
                            r.grid.template.setAll({
                                forceHidden: !0
                            });
                        var o = a.xAxes.push(am5xy.ValueAxis.new(t, {
                            renderer: r,
                            min: 0,
                            max: 100,
                            strictMinMax: !0,
                            numberFormat: "#'%'",
                            tooltip: am5.Tooltip.new(t, {})
                        }));
                        o.get("renderer").labels.template.setAll({
                            fill: am5.color(KTUtil.getCssVariableValue("--bs-gray-500")),
                            fontWeight: "500",
                            fontSize: 16
                        });
                        var i = am5radar.AxisRendererRadial.new(t, {
                            minGridDistance: 20
                        });
                        i.labels.template.setAll({
                            centerX: am5.p100,
                            fontWeight: "500",
                            fontSize: 18,
                            fill: am5.color(KTUtil.getCssVariableValue("--bs-gray-500")),
                            templateField: "columnSettings"
                        }),
                            i.grid.template.setAll({
                                forceHidden: !0
                            });
                        var s = a.yAxes.push(am5xy.CategoryAxis.new(t, {
                            categoryField: "category",
                            renderer: i
                        }));
                        s.data.setAll(l);
                        var n = a.series.push(am5radar.RadarColumnSeries.new(t, {
                            xAxis: o,
                            yAxis: s,
                            clustered: !1,
                            valueXField: "full",
                            categoryYField: "category",
                            fill: t.interfaceColors.get("alternativeBackground")
                        }));
                        n.columns.template.setAll({
                            width: am5.p100,
                            fillOpacity: .08,
                            strokeOpacity: 0,
                            cornerRadius: 20
                        }),
                            n.data.setAll(l);
                        var d = a.series.push(am5radar.RadarColumnSeries.new(t, {
                            xAxis: o,
                            yAxis: s,
                            clustered: !1,
                            valueXField: "value",
                            categoryYField: "category"
                        }));
                        d.columns.template.setAll({
                            width: am5.p100,
                            strokeOpacity: 0,
                            tooltipText: "{category}: {valueX}%",
                            cornerRadius: 20,
                            templateField: "columnSettings"
                        }),
                            d.data.setAll(l),
                            n.appear(1e3),
                            d.appear(1e3),
                            a.appear(1e3, 100)
                    };
                    am5.array.each(am5.registry.rootElements,
                        function(root) {
                            if (root.dom.id == "kt_charts_widget_19_chart_1") {
                                root.dispose();
                            }
                        }
                    )
                    am5.ready((function() {
                            a()
                        }
                    ));
                    t.dispose(),
                        a();
                }
            }
        }()
    }
};
jQuery(document).ready(function () {
    "undefined" != typeof module && (module.exports = KTChartsWidget19),
        KTUtil.onDOMContentLoaded((function() {
                KTChartsWidget19.init()
            }
        ));


    var myTable = $('#tabelListAplikasi').DataTable({
        "ajax": {
            "url": "/dashboard/aplikasi/by_id_proses/"+1,
            "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            "method": "get",
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
            {"data": 1},
            {"data": 2},
            {"data": 3},
            {"data": 4}
        ]
    });

    function loadDataTableWithParam(param) {
        var newUrl = "/dashboard/aplikasi/by_id_proses/" + param; // Construct the new URL with the parameter
        myTable.ajax.url(newUrl).load();
    }

    $('.aplikasinya').on('click', function() {
        var param = $(this).data('param'); // Get the parameter from the button's data attribute
        var judul = $(this).data('judul');
        $('.modal-title').text(judul);
        loadDataTableWithParam(param);
    });


    var versiTable = $('#tabelListVersiAplikasi').DataTable({
        "ajax": {
            "url": "/dashboard/versi_aplikasi/by_id_proses/"+1,
            "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            "method": "get",
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
            {
                "data": "aplikasi.nama"
            },
            {
                "data": "versioning"
            },

            {
                "data": "null",
                render: function (data, type, row) {
                    return '<b>Subdit</b> - '+row.aplikasi.subdit.namaSubdit+' <br><b>Seksi</b> - '
                        +row.aplikasi.seksi.namaSeksi;
                },
            },

            {
                "data": "null",
                render: function (data, type, row) {
                    return row.aplikasi.stakeholder != null ? row.aplikasi.stakeholder.namaStakeholder : "-";
                }
            },

            {
                "data": "null",
                render: function (data, type, row) {
                    var perencanaan = [];
                    var pengembangan = [];
                    var pengujian = [];
                    var deploy = [];
                    row.timProyekList.forEach(function (tim){
                        switch (tim.role.proses.idProses) {
                            case 1:
                                if (!perencanaan.includes(tim.namaPegawai)) {
                                    perencanaan.push(tim.namaPegawai);
                                }
                                break;
                            case 2:
                                if (!pengembangan.includes(tim.namaPegawai)) {
                                    pengembangan.push(tim.namaPegawai);
                                }
                                break;
                            case 3:
                                if (!pengujian.includes(tim.namaPegawai)) {
                                    pengujian.push(tim.namaPegawai);
                                }
                                break;
                            case 4:
                                if (!deploy.includes(tim.namaPegawai)) {
                                    deploy.push(tim.namaPegawai);
                                }
                                break;
                        }
                    });
                    perencanaan = perencanaan.join(', ');
                    pengembangan = pengembangan.join(', ');
                    pengujian = pengujian.join(', ');
                    deploy = deploy.join(', ');
                    return '<b>Perencanaan</b> - '+perencanaan+' <br><b>Pengembangan</b> - '+pengembangan+'<br>' +
                        '<b>Pengujian</b> - '+pengujian+'<br><b>Deploy</b> - '+deploy;
                }
            },

            {
                "data": "null",
                render: function (data, type, row) {
                    return row.deadlineProyek != null ? row.deadlineProyek : "-";
                }
            },
        ]
    });

    function loadDataTableVersiWithParam(param) {
        var newUrl = "/dashboard/versi_aplikasi/by_id_proses/" + param; // Construct the new URL with the parameter
        versiTable.ajax.url(newUrl).load();
    }

    $('.versiaplikasinya').on('click', function() {
        var param = $(this).data('param'); // Get the parameter from the button's data attribute
        var judul = $(this).data('judul');
        $('.modal-title').text(judul);
        loadDataTableVersiWithParam(param);
    });


});


var KTSlidersWidget1 = function() {
    var e = {
        self: null,
        rendered: !1
    }
        , t = {
        self: null,
        rendered: !1
    }
        , a = {
        self: null,
        rendered: !1
    }
        , l = function(e, t, a) {
        var l = document.querySelector(t);
        if (l && (!0 !== e.rendered || !l.classList.contains("initialized"))) {
            var r = parseInt(KTUtil.css(l, "height"))
                , o = KTUtil.getCssVariableValue("--bs-success")
                , i = {
                series: [a],
                chart: {
                    fontFamily: "inherit",
                    height: r,
                    type: "radialBar",
                    sparkline: {
                        enabled: !0
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "45%"
                        },
                        dataLabels: {
                            showOn: "always",
                            name: {
                                show: !1
                            },
                            value: {
                                show: !1
                            }
                        },
                        track: {
                            // background: KTUtil.getCssVariableValue('--kt-info'),
                            strokeWidth: "90%"
                        }
                    }
                },
                colors: [o],
                stroke: {
                    lineCap: "round"
                },
                labels: ["Progress"]
            };
            e.self = new ApexCharts(l,i),
                e.self.render(),
                e.rendered = !0,
                l.classList.add("initialized")
        }
    };
    return {
        init: function() {

            l(e, "#kt_slider_widget_1_chart_1", (totalPortoPspmGit/totalPortoPspm)*100);

            var r = document.querySelector("#kt_sliders_widget_1_slider");
            if (r) {
                r.addEventListener("slid.bs.carousel", function(e) {
                    if (1 === e.to) {
                        l(t, "#kt_slider_widget_1_chart_2", (totalPortoPspp1Git/totalPortoPspp1)*100);
                    }
                    if (2 === e.to) {
                        l(a, "#kt_slider_widget_1_chart_3", (totalPortoPspp2Git/totalPortoPspp2)*100);
                    }
                });

                if (e.rendered) {
                    e.self.destroy();
                    e.rendered = false;
                }
                if (t.rendered) {
                    t.self.destroy();
                    t.rendered = false;
                }
                if (a.rendered) {
                    a.self.destroy();
                    a.rendered = false;
                }
                l(e, "#kt_slider_widget_1_chart_1", (totalPortoPspmGit/totalPortoPspm)*100);
                l(t, "#kt_slider_widget_1_chart_2", (totalPortoPspp1Git/totalPortoPspp1)*100);
                l(a, "#kt_slider_widget_1_chart_3", (totalPortoPspp2Git/totalPortoPspp2)*100);
            }
        }
    }
}();
"undefined" != typeof module && (module.exports = KTSlidersWidget1),
    KTUtil.onDOMContentLoaded((function() {
            KTSlidersWidget1.init()
        }
    ));

function goToDetailPortofolioAplikasi(id) {
    window.open(window.location.origin + "/portofolio/detail/" + id, '_blank');
}
