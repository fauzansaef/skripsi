var IndexPerencanaan = function () {

    const stringToDate = function (dateString) {
        const [dd, mm, yyyy] = dateString.split("-");
        return new Date(`${yyyy}-${mm}-${dd}`);
    };

    var loadTablePerencanaan = function () {
        var tabelPerencanaan = $('#tabelPerencanaan').DataTable({
            "ajax": {
                "url": "/api/v1/perencanaan/versi_aplikasis/by_id_proses",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "data": function (d) {
                    d.idProses = 1
                }
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

                {
                    "data": "null",
                    render: function (data, type, row) {

                        console.log(row.status)

                        if(row.status==null){
                            return "-"
                        }else if(row.idStatus == 4){
                            let tolak =  row.status.namaStatus + "<br><b>Alasan</b>: <u>" + row.alasantolakReviewinisiasi +"</u>";
                            return tolak;
                        }

                        return row.status.namaStatus;
                    }
                },

                {
                    "data": "null",
                    render: function (data, type, row) {
                        var buttons = '';
                        var buttonEdit =
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1" title="Edit" onclick="goToEditSurat('+row['idVersion']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">' +
                            '           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> ' +
                            '                   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> ' +
                            '                   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> ' +
                            '           </svg>'+
                            '      </span>\n' +
                            '</button>';
                        var buttonHapus =
                            '<button class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1" title="Hapus" onclick="hapusProyekPerencanaan('+row.idVersion+')">\n' +
                            '      <span class="svg-icon svg-icon-3">' +
                            '           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"> ' +
                            '                   <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/> ' +
                            '           </svg>'+
                            '      </span>\n' +
                            '</button>';
                        var buttonPerencanaan =
                            '<button class="btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1 mb-1" title="Ajukan Perencanaan" onclick="ajukanPerencanaan('+row['idVersion']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">' +
                            '               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-arrow-up" viewBox="0 0 16 16"> ' +
                            '                   <path fill-rule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"/> ' +
                            '                   <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/> ' +
                            '                   <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/> ' +
                            '               </svg>' +
                            '      </span>\n' +
                            '</button>';
                        var buttonReviewInisiasi=
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1" title="Ajukan Pengembangan" onclick="hapusSurat('+row['idVersion']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">' +
                            '               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cpu" viewBox="0 0 16 16">\n' +
                            '                       <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>\n' +
                            '               </svg>' +
                            '      </span>\n' +
                            '</button>';

                        var buttonPengembangan =
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1" title="Ajukan Pengembangan" onclick="manajemen('+row['idVersion']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">' +
                            '               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cpu" viewBox="0 0 16 16">\n' +
                            '                       <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>\n' +
                            '               </svg>' +
                            '      </span>\n' +
                            '</button>';

                        if(row.idStatus == 1){
                            buttons = buttonEdit + buttonHapus + buttonPerencanaan;
                        }
                        // else if(row.idStatus == 2){
                        //     buttons = buttonPengembangan;
                        // }
                        else if(row.idStatus == 3){
                            buttons = buttonPengembangan;
                        }else{
                            buttons = "-";//ganti jadi button view
                        }
                        return buttons;
                    }
                }
            ]
        });

        var fixedHeader = new $.fn.dataTable.FixedHeader( tabelPerencanaan, {
            headerOffset: $('.card-header').outerHeight()
        });

        const card = document.querySelector('.card');

        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                tabelPerencanaan.fixedHeader.adjust();
            }
        });

        ro.observe(card);

        if ($('#cariTabelPerencanaan').length > 0) {
            var filterSearch = document.querySelector('[data-perencanaan="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelPerencanaan.search(e.target.value).draw();
            });
        }
    }



    return {
        init: function () {
            loadTablePerencanaan();
        }
    };
}();


jQuery(document).ready(function () {
    IndexPerencanaan.init();
});

function goToTambahPerencanaan() {
    window.open(window.location.origin + "/perencanaan/tambah", '_blank');
}

function manajemen(id) {
    window.open(window.location.origin + "/perencanaan/manajemenperencanaan/"+id, '_blank');
}
function hapusProyekPerencanaan(id) {
    swal.fire({
        title: "Hapus Proyek?",
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
                url: "/api/v1/perencanaan/versi_aplikasis/"+id,
                type: "delete",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id},
                success: function (data) {
                    if(data.code === 200){
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Dihapus",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelPerencanaan').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}

function ajukanPerencanaan(id) {
    swal.fire({
        title: "Ajukan Perencanaan?",
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ya, ajukan",
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
                url: "/api/v1/perencanaan/versi_aplikasis/inisiasi/ajukan/"+id,
                type: "patch",
                headers: {"X-CSRF-TOKEN": token},
                data: {id: id},
                success: function (data) {
                    if(data.code === 200){
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Diajukan",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function () {
                            $('#tabelPerencanaan').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}
