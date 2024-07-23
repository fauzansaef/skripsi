"use strict";
// Class definition

var KTDatatableDashboardVersioning = function () {

    var dashboardVersioning = function () {
        var date1 = $("#inputTanggalMulaiVersioning").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y",
            onChange: function(selectedDates, dateStr) {
                date2.set('minDate', dateStr)
            }
        });

        var date2 = $("#inputTanggalAkhirVersioning").flatpickr({
            dateFormat:"d-m-Y",
            onChange: function(selectedDates, dateStr) {
                date1.set('maxDate', dateStr)
            }
        });

        $("#inputTanggalDokumenVersioning").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y"
        });

    };

    var handleVersioning = function () {
        var tabelVersioning = $('#tabelVersioning').DataTable({
            "ajax": {
                "url": "/service-pengembangan/versioning/list-versioning/"+$('#idAplikasi').val(),
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
                {"data": "null",
                    render: function (data, type, row) {
                        return '<span class="text-dark fw-bolder text-primary mb-1 fs-6">Ver '+row['versioning']+'</span>\n' +
                            ' <span class="text-muted fw-bold d-block" style="font-size: 12px;">'+row['aplikasi'].toString().substring(0,200)+'</span>';
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['tgl_mulai_pengembangan'] !== null && row['tgl_akhir_pengembangan'] !== null){
                            return moment(new Date(row['tgl_mulai_pengembangan'])).format("DD/MM/YYYY") +" - "+ moment(new Date(row['tgl_akhir_pengembangan'])).format("DD/MM/YYYY");
                        }else{
                            return "-";
                        }
                    }
                },
                {"data": "dokumen",
                    render: function (data, type, row) {
                        if(data !== null){
                            return data;
                        }else{
                            return "-";
                        }
                    }
                },
                {"data": "no_kep_tim",
                    render: function (data, type, row) {
                        if(data !== null){
                            return data;
                        }else{
                            return "-";
                        }
                    }
                },
                {"data": "proses"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Lihat Detail" onclick="showDetailVersion('+row['id_version']+')">\n' +
                            '       <span class="svg-icon svg-icon-2"> ' +
                            '           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                            '               <path d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z" fill="currentColor"></path> ' +
                            '               <path d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z" fill="currentColor"></path> ' +
                            '               <path opacity="0.3" d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z" fill="currentColor"></path> ' +
                            '               <path opacity="0.3" d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z" fill="currentColor"></path> ' +
                            '           </svg> ' +
                            '       </span>' +
                            '</button>' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Tim" onclick="goToTambahTim('+row['id_version']+')">\n' +
                            '       <span class="svg-icon svg-icon-2"> ' +
                            '           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                            '               <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor"></path> ' +
                            '               <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor"></rect> ' +
                            '           </svg> ' +
                            '       </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Dokumen" onclick="goToTambahDokumenProyek('+row['id_version']+')">\n' +
                            '      <span class="svg-icon svg-icon-2"> ' +
                            '           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                            '               <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="currentColor"></path> ' +
                            '               <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="currentColor"></path> ' +
                            '           </svg> ' +
                            '       </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToEditVersion('+row['id_version']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusVersion('+row['id_version']+')">\n' +
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

        if ($('#cariTabelVersioning').length > 0) {
            var filterSearch = document.querySelector('[data-versioning="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelVersioning.search(e.target.value).draw();
            });
        }

        $("#formTambahVersioningAplikasi").validate({
            rules: {
                inputVersioningAplikasi: {required: true},
                inputTahunProject: {required: true},
                inputStatusProject: {required: true}
            },

            submitHandler: function () {

                if($('#uploadDokumenVersioning').prop('files')[0]) {
                    if ($("#uploadDokumenVersioning")[0].files[0].size > 31457280) {
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
                formData.append('inputIdAplikasi', $('#idAplikasi').val());
                formData.append('inputVersioningAplikasi', $('#inputVersioningAplikasi').val());
                formData.append('inputTahunProject', $('#inputTahunProject').val());
                formData.append('inputStatusProject', $('#inputStatusProject').val());
                formData.append('inputKeteranganVersioning', $('#inputKeteranganVersioning').val());
                formData.append('inputTanggalMulaiVersioning', $('#inputTanggalMulaiVersioning').val());
                formData.append('inputTanggalAkhirVersioning', $('#inputTanggalAkhirVersioning').val());
                formData.append('inputJenisDokumenVersioning', $('#inputJenisDokumenVersioning').val());
                formData.append('inputNoDokumenVersioning', $('#inputNoDokumenVersioning').val());
                formData.append('inputTanggalDokumenVersioning', $('#inputTanggalDokumenVersioning').val());
                formData.append('uploadDokumenVersioning', $('#uploadDokumenVersioning').prop('files')[0]);

                showLoading();
                $.ajax({
                    url: "/service-pengembangan/versioning/simpan-versioning",
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
                            text: "Data Berhasil Disimpan. Selanjutnya Tambah Tim.",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/pengembangan/tim/tambah/"+data;
                        });
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

    };

    var handleEditVersioning = function () {
        if ($('#dokumenDasar').val() === "") {
            document.getElementById('divUploadDokumenDasar').style.display = "block";
        }

        $("#formEditVersioningAplikasi").validate({
            rules: {
                inputVersioningAplikasi: {required: true},
                inputTahunProject: {required: true},
                inputStatusProject: {required: true}
            },

            submitHandler: function () {

                var formData = new FormData();
                formData.append('idVersion', $('#idVersion').val());
                formData.append('inputVersioningAplikasi', $('#inputVersioningAplikasi').val());
                formData.append('inputTahunProject', $('#inputTahunProject').val());
                formData.append('inputStatusProject', $('#inputStatusProject').val());
                formData.append('inputKeteranganVersioning', $('#inputKeteranganVersioning').val());
                formData.append('inputTanggalMulaiVersioning', $('#inputTanggalMulaiVersioning').val());
                formData.append('inputTanggalAkhirVersioning', $('#inputTanggalAkhirVersioning').val());
                formData.append('inputJenisDokumenVersioning', $('#inputJenisDokumenVersioning').val());
                formData.append('inputNoDokumenVersioning', $('#inputNoDokumenVersioning').val());
                formData.append('inputTanggalDokumenVersioning', $('#inputTanggalDokumenVersioning').val());
                formData.append('uploadDokumenVersioning', $('#uploadDokumenVersioning').prop('files')[0]);

                showLoading();
                $.ajax({
                    url: "/service-pengembangan/versioning/edit-versioning",
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
                            window.location.href = "/pengembangan/versioning/list/"+data;
                        });
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
            dashboardVersioning();
            handleVersioning();
            handleEditVersioning();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardVersioning.init();
});