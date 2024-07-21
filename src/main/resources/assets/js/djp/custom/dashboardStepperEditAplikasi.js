"use strict";
// Class definition

var KTDashboardStepperEditAplikasi = function () {

    var dashboardStepper = function () {
        var date1 = $("#inputTanggalMulaiVersioning").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"Y-m-d",
            onChange: function(selectedDates, dateStr) {
                date2.set('minDate', dateStr)
            }
        });

        var date2 = $("#inputTanggalAkhirVersioning").flatpickr({
            dateFormat:"Y-m-d",
            onChange: function(selectedDates, dateStr) {
                date1.set('maxDate', dateStr)
            }
        });

        var tglAwalPerencanaan = $("#inputTanggalAwalPerencanaan").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"Y-m-d",
            onChange: function(selectedDates, dateStr) {
                tglAkhirPerencanaan.set('minDate', dateStr)
            }
        });

        var tglAkhirPerencanaan = $("#inputTanggalAkhirPerencanaan").flatpickr({
            dateFormat:"Y-m-d",
            onChange: function(selectedDates, dateStr) {
                tglAwalPerencanaan.set('maxDate', dateStr)
            }
        });

        var tglAwalPengujian = $("#inputTanggalAwalPengujian").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"Y-m-d",
            onChange: function(selectedDates, dateStr) {
                tglAkhirPengujian.set('minDate', dateStr)
            }
        });

        var tglAkhirPengujian = $("#inputTanggalAkhirPengujian").flatpickr({
            dateFormat:"Y-m-d",
            onChange: function(selectedDates, dateStr) {
                tglAwalPengujian.set('maxDate', dateStr)
            }
        });

        $("#tglKepTim, #inputTanggalSurat, #inputTanggalSuratLhr, #inputDeadline").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"Y-m-d"
        });

        $("#tglDokumenDasar, #tglDokumenPerencanaan, #tglDokumenPengembangan, #tglDokumenPengujian, #tglDokumenDeployment").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"Y-m-d"
        });

        $('#uploadKepTim').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadKepTim').text(fileName.substring(0,20) + "...");
        });

        $('#uploadDokumenDasar').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadDokumenDasar').text(fileName.substring(0,20) + "...");
        });

        $('#uploadDokumenPerencanaan').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadDokumenPerencanaan').text(fileName.substring(0,20) + "...");
        });

        $('#uploadDokumenPengembangan').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadDokumenPengembangan').text(fileName.substring(0,20) + "...");
        });

        $('#uploadDokumenPengujian').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadDokumenPengujian').text(fileName.substring(0,20) + "...");
        });

        $('#uploadDokumenDeployment').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadDokumenDeployment').text(fileName.substring(0,20) + "...");
        });

        $('#uploadDokumenLainnya').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadDokumenLainnya').text(fileName.substring(0,20) + "...");
        });

        $('#uploadFileSurat').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadFileSurat').text(fileName.substring(0,20) + "...");
        });

        $('#uploadFileLhr').change(function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,50);
            $('#labelUploadFileLhr').text(fileName.substring(0,20) + "...");
        });
    };

    var handleTimStepper = function () {
        var tabelTim = $('#tabelTim').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-tim/"+$('#idVersion').val(),
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
                {"data": "nama_pegawai"},
                {"data": "role.nama"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusTimStepper('+row['id_tim']+')">' +
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

        if($('#cariTabelTim').length > 0) {
            var filterSearch = document.querySelector('[data-tim="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelTim.search(e.target.value).draw();
            });
        }

        $("#formTambahTim").validate({
            rules: {
                inputNamaPegawai: {required: true},
                inputRolePegawai: {required: true},
                inputNIPPendekPegawai: {required: true}

            },
            submitHandler: function () {
                $('#modalTambahBagianTim').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-tim",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputNamaPegawai: $('#inputNamaPegawai').val(),
                        inputRolePegawai: $('#inputRolePegawai').val(),
                        inputNIPPendekPegawai: $('#inputNIPPendekPegawai').val(),
                        idVersion: $('#idVersion').val()
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelTim').DataTable().ajax.reload(null, false);
                                $('#formTambahTim')[0].reset();
                                $("#detailPegawai").css("display","none");
                                $("#inputNamaPegawai").val("");
                                $("#inputNIPPendekPegawai").val("");
                                $('#inputRolePegawai').get(0).selectedIndex = 1;
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

        $("#formUploadKepTim").validate({
            rules: {
                noKepTim: {required: true},
                tglKepTim: {required: true},
                uploadKepTim: {required: true}

            },
            submitHandler: function () {
                showLoading();

                if ($("#uploadKepTim")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('noKepTim', $('#noKepTim').val());
                formData.append('tglKepTim', $('#tglKepTim').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadKepTim', $('#uploadKepTim').prop('files')[0]);

                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-kep-tim",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if(data === "0"){
                            errorResult();
                        }else {
                            swal.fire({
                                title: "SUKSES",
                                text: "KEP Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#formUploadKepTim')[0].reset();
                                $('#tabelKepTim').DataTable().ajax.reload(null, false);
                                document.getElementById("labelUploadKepTim").innerText = '';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $('#tabelKepTim').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-kep-tim/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "paging": false,
            "info": false,
            "sort": false,
            "searching": false,
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
                    "data": "no_kep_tim",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {"data": "tgl_keptim",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return moment(new Date(data)).format("DD MMM yyyy");
                        }
                    }
                },
                {
                    "data": "file_keptim",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {
                    "data": "id_version",
                    render: function (data, type, row) {
                        var link = '/pengembangan/versioning/download/' + data + '/2';
                        if(row['file_keptim'] == null){
                            return "-"
                        }else {
                            return '<div class="d-flex align-items-senter"> ' +
                                '<div class="d-flex align-items-senter"> ' +
                                '<a  href="' + link + '"><img src="/assets/media/files/pdf.svg" style="width: 40px; margin-left: -5px;"></a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    }
                }
            ]
        });

    };

    var handleDokumenStepper = function () {
        $('#tabelDokumenDasar').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-dokumen-dasar/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "paging": false,
            "info": false,
            "sort": false,
            "searching": false,
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
                {"data": "jenisDokumen"},
                {"data": "noDokumen"},
                {"data": "tglDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return moment(new Date(data)).format("DD MMM YYYY");
                        }
                    }
                },
                {"data": "nmFile"},
                {
                    "data": "id_version",
                    render: function (data, type, row) {
                        var link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/1';
                        if(row['noDokumen'] == null){
                            return "-"
                        }else {
                            var fileExt = row['nmFile'].split('.').pop();
                            var imgFile;
                            if(fileExt === "xls" || fileExt === "xlsx" || fileExt === "csv"){
                                imgFile = "/assets/media/files/csv.svg";
                            }else if(fileExt === "docx"){
                                imgFile = "/assets/media/files/doc.svg";
                            }else if(fileExt === "pdf"){
                                imgFile = "/assets/media/files/pdf.svg";
                            }else{
                                return "Ekstensi file tidak terdeteksi aplikasi. Silahkan hubungi administrator";
                            }

                            return '<div class="d-flex align-items-senter"> ' +
                                '<div class="d-flex align-items-senter"> ' +
                                '<a  href="' + link + '"><img src="'+imgFile+'" style="width: 40px; margin-left: -5px;"></a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    }
                }
            ]
        });

        $("#formUploadDokumenDasar").validate({
            rules: {
                jenisDokumenDasar: {required: true},
                noDokumenDasar: {required: true},
                tglDokumenDasar: {required: true},
                uploadDokumenDasar: {required: true}
            },
            submitHandler: function () {
                showLoading();

                if ($("#uploadDokumenDasar")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('jenisDokumenDasar', $('#jenisDokumenDasar').val());
                formData.append('noDokumenDasar', $('#noDokumenDasar').val());
                formData.append('tglDokumenDasar', $('#tglDokumenDasar').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadDokumenDasar', $('#uploadDokumenDasar').prop('files')[0]);

                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-dokumen-dasar",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if(data === "0"){
                            errorResult();
                        }else{
                            swal.fire({
                                title: "SUKSES",
                                text: "Dokumen Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#formUploadDokumenDasar')[0].reset();
                                $('#tabelDokumenDasar').DataTable().ajax.reload(null, false);
                                document.getElementById("labelUploadDokumenDasar").innerText='';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $('#tabelDokumenPerencanaan').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-dokumen-perencanaan/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "paging": false,
            "info": false,
            "sort": false,
            "searching": false,
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
                {"data": "jenisDokumen"},
                {"data": "noDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {
                    "data": "id_version",
                    render: function (data, type, row) {
                        var link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/3';
                        if(row['jenisDokumen'] === 'PMP'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/4';
                        }else if(row['jenisDokumen'] === 'Kajian'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/5';
                        }

                        if(row['noDokumen'] == null){
                            return "-"
                        }else {
                            var fileExt = row['noDokumen'].split('.').pop();
                            var imgFile;
                            if(fileExt === "xls" || fileExt === "xlsx" || fileExt === "csv"){
                                imgFile = "/assets/media/files/csv.svg";
                            }else if(fileExt === "docx"){
                                imgFile = "/assets/media/files/doc.svg";
                            }else if(fileExt === "pdf"){
                                imgFile = "/assets/media/files/pdf.svg";
                            }else{
                                return "Ekstensi file tidak terdeteksi aplikasi. Silahkan hubungi administrator";
                            }

                            return '<div class="d-flex align-items-senter"> ' +
                                '<div class="d-flex align-items-senter"> ' +
                                '<a  href="' + link + '"><img src="'+imgFile+'" style="width: 40px; margin-left: -5px;"></a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    }
                },
                {"data": "pembuatDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {"data": "tglDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return moment(new Date(data)).format("DD MMM YYYY");
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit Dokumen" data-toggle="modal" data-bs-toggle="modal" data-bs-target="#modalEditDokumenPerencanaan" data-jenisdokumen="' + row['jenisDokumen'] + '" data-tgldokumen="' + row['tglDokumen'] + '">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusDokumenPerencanaan(this)" data-jenisdokumen="' + row['jenisDokumen'] + '">' +
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

        $("#formEditDokumenPerencanaan").validate({
            rules: {
                tglDokumenPerencanaan: {required: true},
                uploadDokumenPerencanaan: {required: true}

            },
            submitHandler: function () {
                $('#modalEditDokumenPerencanaan').modal('hide');
                showLoading();

                if ($("#uploadDokumenPerencanaan")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('jenisDokumenPerencanaan', $('#jenisDokumenPerencanaan').val());
                formData.append('tglDokumenPerencanaan', $('#tglDokumenPerencanaan').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadDokumenPerencanaan', $('#uploadDokumenPerencanaan').prop('files')[0]);

                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-dokumen-perencanaan",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if(data === "0"){
                            errorResult();
                        }else {
                            swal.fire({
                                title: "SUKSES",
                                text: "Dokumen Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#formEditDokumenPerencanaan')[0].reset();
                                $('#tabelDokumenPerencanaan').DataTable().ajax.reload(null, false);
                                document.getElementById("labelUploadDokumenPerencanaan").innerText = '';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $('#tabelDokumenPengembangan').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-dokumen-pengembangan/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "paging": false,
            "info": false,
            "sort": false,
            "searching": false,
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
                {"data": "jenisDokumen"},
                {"data": "noDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {
                    "data": "id_version",
                    render: function (data, type, row) {
                        var link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/7';
                        if(row['jenisDokumen'] === 'SRS'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/8';
                        }else if(row['jenisDokumen'] === 'SDD'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/9';
                        }

                        if(row['noDokumen'] == null){
                            return "-"
                        }else {
                            var fileExt = row['noDokumen'].split('.').pop();
                            var imgFile;
                            if(fileExt === "xls" || fileExt === "xlsx" || fileExt === "csv"){
                                imgFile = "/assets/media/files/csv.svg";
                            }else if(fileExt === "docx"){
                                imgFile = "/assets/media/files/doc.svg";
                            }else if(fileExt === "pdf"){
                                imgFile = "/assets/media/files/pdf.svg";
                            }else{
                                return "Ekstensi file tidak terdeteksi aplikasi. Silahkan hubungi administrator";
                            }

                            return '<div class="d-flex align-items-senter"> ' +
                                '<div class="d-flex align-items-senter"> ' +
                                '<a  href="' + link + '"><img src="'+imgFile+'" style="width: 40px; margin-left: -5px;"></a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    }
                },
                {"data": "pembuatDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {"data": "tglDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return moment(new Date(data)).format("DD MMM YYYY");
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit Dokumen" data-toggle="modal" data-bs-toggle="modal" data-bs-target="#modalEditDokumenPengembangan" data-jenisdokumen="' + row['jenisDokumen'] + '" data-tgldokumen="' + row['tglDokumen'] + '">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusDokumenPengembangan(this)" data-jenisdokumen="' + row['jenisDokumen'] + '">' +
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

        $("#formEditDokumenPengembangan").validate({
            rules: {
                tglDokumenPengembangan: {required: true},
                uploadDokumenPengembangan: {required: true}

            },
            submitHandler: function () {
                $('#modalEditDokumenPengembangan').modal('hide');
                showLoading();

                if ($("#uploadDokumenPengembangan")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('jenisDokumenPengembangan', $('#jenisDokumenPengembangan').val());
                formData.append('tglDokumenPengembangan', $('#tglDokumenPengembangan').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadDokumenPengembangan', $('#uploadDokumenPengembangan').prop('files')[0]);

                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-dokumen-pengembangan",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if(data === "0"){
                            errorResult();
                        }else {
                            swal.fire({
                                title: "SUKSES",
                                text: "Dokumen Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#formEditDokumenPengembangan')[0].reset();
                                $('#tabelDokumenPengembangan').DataTable().ajax.reload(null, false);
                                document.getElementById("labelUploadDokumenPengembangan").innerText = '';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $('#tabelDokumenPengujian').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-dokumen-pengujian/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "paging": false,
            "info": false,
            "sort": false,
            "searching": false,
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
                {"data": "jenisDokumen"},
                {"data": "noDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {
                    "data": "id_version",
                    render: function (data, type, row) {
                        var link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/13';
                        if(row['jenisDokumen'] === 'Permohonan UAT'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/14';
                        }else if(row['jenisDokumen'] === 'ToK'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/10';
                        }else if(row['jenisDokumen'] === 'UAT'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/11';
                        }else if(row['jenisDokumen'] === 'Deploy'){
                            link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/12';
                        }

                        if(row['noDokumen'] == null){
                            return "-"
                        }else {
                            var fileExt = row['noDokumen'].split('.').pop();
                            var imgFile;
                            if(fileExt === "xls" || fileExt === "xlsx" || fileExt === "csv"){
                                imgFile = "/assets/media/files/csv.svg";
                            }else if(fileExt === "docx"){
                                imgFile = "/assets/media/files/doc.svg";
                            }else if(fileExt === "pdf"){
                                imgFile = "/assets/media/files/pdf.svg";
                            }else{
                                return "Ekstensi file tidak terdeteksi aplikasi. Silahkan hubungi administrator";
                            }

                            return '<div class="d-flex align-items-senter"> ' +
                                '<div class="d-flex align-items-senter"> ' +
                                '<a  href="' + link + '"><img src="'+imgFile+'" style="width: 40px; margin-left: -5px;"></a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    }
                },
                {"data": "tglDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return moment(new Date(data)).format("DD MMM YYYY");
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit Dokumen" data-toggle="modal" data-bs-toggle="modal" data-bs-target="#modalEditDokumenPengujian" data-jenisdokumen="' + row['jenisDokumen'] + '" data-tgldokumen="' + row['tglDokumen'] + '">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusDokumenPengujian(this)" data-jenisdokumen="' + row['jenisDokumen'] + '">' +
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

        $("#formEditDokumenPengujian").validate({
            rules: {
                tglDokumenPengujian: {required: true},
                uploadDokumenPengujian: {required: true}

            },
            submitHandler: function () {
                $('#modalEditDokumenPengujian').modal('hide');
                showLoading();

                if ($("#uploadDokumenPengujian")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('jenisDokumenPengujian', $('#jenisDokumenPengujian').val());
                formData.append('tglDokumenPengujian', $('#tglDokumenPengujian').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadDokumenPengujian', $('#uploadDokumenPengujian').prop('files')[0]);

                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-dokumen-pengujian",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if (data === "0") {
                             errorResult();
                        }else{
                            swal.fire({
                                title: "SUKSES",
                                text: "Dokumen Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#formEditDokumenPengujian')[0].reset();
                                $('#tabelDokumenPengujian').DataTable().ajax.reload(null, false);
                                document.getElementById("labelUploadDokumenPengujian").innerText = '';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $('#tabelDokumenDeployment').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-dokumen-deployment/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "paging": false,
            "info": false,
            "sort": false,
            "searching": false,
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
                {"data": "jenisDokumen"},
                {"data": "noDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return data;
                        }
                    }
                },
                {
                    "data": "id_version",
                    render: function (data, type, row) {
                        var link = '/pengembangan/versioning/download/' + $('#idVersion').val() + '/15';
                        if(row['noDokumen'] == null){
                            return "-"
                        }else {
                            var fileExt = row['noDokumen'].split('.').pop();
                            var imgFile;
                            if(fileExt === "xls" || fileExt === "xlsx" || fileExt === "csv"){
                                imgFile = "/assets/media/files/csv.svg";
                            }else if(fileExt === "docx"){
                                imgFile = "/assets/media/files/doc.svg";
                            }else if(fileExt === "pdf"){
                                imgFile = "/assets/media/files/pdf.svg";
                            }else{
                                return "Ekstensi file tidak terdeteksi aplikasi. Silahkan hubungi administrator";
                            }

                            return '<div class="d-flex align-items-senter"> ' +
                                '<div class="d-flex align-items-senter"> ' +
                                '<a  href="' + link + '"><img src="'+imgFile+'" style="width: 40px; margin-left: -5px;"></a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    }
                },
                {"data": "tglDokumen",
                    render: function (data, type, row) {
                        if(data == null){
                            return "-";
                        }else{
                            return moment(new Date(data)).format("DD MMM YYYY");
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit Dokumen" data-toggle="modal" data-bs-toggle="modal" data-bs-target="#modalEditDokumenDeployment" data-jenisdokumen="' + row['jenisDokumen'] + '" data-tgldokumen="' + row['tglDokumen'] + '">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusDokumenDeployment(this)" data-jenisdokumen="' + row['jenisDokumen'] + '">' +
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

        $("#formEditDokumenDeployment").validate({
            rules: {
                tglDokumenDeployment: {required: true},
                uploadDokumenDeployment: {required: true}
            },
            submitHandler: function () {
                $('#modalEditDokumenDeployment').modal('hide');
                showLoading();

                if ($("#uploadDokumenDeployment")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('jenisDokumenDeployment', $('#jenisDokumenDeployment').val());
                formData.append('tglDokumenDeployment', $('#tglDokumenDeployment').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadDokumenDeployment', $('#uploadDokumenDeployment').prop('files')[0]);

                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-dokumen-deployment",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if(data === "0"){
                            errorResult();
                        }else {
                            swal.fire({
                                title: "SUKSES",
                                text: "Dokumen Berhasil Disimpan",
                                icon: "success"
                            }).then(function () {
                                $('#formEditDokumenDeployment')[0].reset();
                                $('#tabelDokumenDeployment').DataTable().ajax.reload(null, false);
                                document.getElementById("labelUploadDokumenDeployment").innerText = '';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $("#formTambahDokumen").validate({
            rules: {
                inputNamaDokumen: {required: true},
                inputPembuatDokumen: {required: true},
                uploadDokumenLainnya: {required: true},
                prosesDokumen: {required: true}
            },
            submitHandler: function () {
                showLoading();
                if ($("#uploadDokumenLainnya")[0].files[0].size > 31457280) {
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

                var formData = new FormData();
                formData.append('idVersion', $('#idVersion').val());
                formData.append('inputNamaDokumen', $('#inputNamaDokumen').val());
                formData.append('inputPembuatDokumen', $('#inputPembuatDokumen').val());
                formData.append('uploadDokumenLainnya', $('#uploadDokumenLainnya').prop('files')[0]);
                formData.append('prosesDokumen', $('#prosesDokumen').val());

                showLoading();
                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-dokumen",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if(data === "0"){
                            errorResult();
                        }else{
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelDokumen').DataTable().ajax.reload(null, false);
                                $('#formTambahDokumen')[0].reset();
                                document.getElementById("labelUploadDokumenLainnya").innerText='';
                            });
                        }
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        var tabelDokumen = $('#tabelDokumen').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-dokumen/"+$('#idVersion').val(),
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
                        return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+row['nama_dokumen']+'</a>\n' +
                            ' <span class="text-muted fw-bold d-block">'+row['nama_pembuat_dokumen']+' tanggal '+moment(new Date(row['wkt_upload'])).format("DD MMM YYYY")+'</span>';
                    }
                },
                {"data": "proses.nama",
                    render: function (data, type, row) {
                        return data;
                    }
                },
                {
                    "data": "id_dokumen",
                    render: function (data, type, row) {
                        var link = '/pengembangan/dokumen/download/' + data;
                        var fileExt = row['file_dokumen'].split('.').pop();
                        var imgFile;
                        if(fileExt === "xls" || fileExt === "xlsx" || fileExt === "csv"){
                            imgFile = "/assets/media/files/csv.svg";
                        }else if(fileExt === "docx"){
                            imgFile = "/assets/media/files/doc.svg";
                        }else if(fileExt === "pdf"){
                            imgFile = "/assets/media/files/pdf.svg";
                        }else{
                            return "Ekstensi file tidak terdeteksi aplikasi. Silahkan hubungi administrator";
                        }

                        return '<div class="d-flex align-items-senter"> ' +
                            '<div class="d-flex align-items-senter"> ' +
                            '<a  href="' + link + '"><img src="'+imgFile+'" style="width: 40px; margin-left: -5px;"></a> ' +
                            '</div> ' +
                            '</div> ';
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusDokumen('+row['id_dokumen']+')">' +
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

        if($('#cariTabelDokumen').length > 0) {
            var filterSearch = document.querySelector('[data-dokumen="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelDokumen.search(e.target.value).draw();
            });
        }

    };

    var handleSuratStepper = function (){
        $("#formTambahSurat").validate({
            rules: {
                inputNoSurat: {required: true},
                inputInstansiPenerbitSurat: {required: true},
                inputJenisSurat: {required: true},
                inputTanggalSurat: {required: true}
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

                formData.append('inputNoSurat', $('#inputNoSurat').val());
                formData.append('inputInstansiPenerbitSurat', $('#inputInstansiPenerbitSurat').val());
                formData.append('inputJenisSurat', $('#inputJenisSurat').val());
                formData.append('inputTanggalSurat', $('#inputTanggalSurat').val());
                formData.append('inputPerihalSurat', $('#inputPerihalSurat').val());
                formData.append('uploadFileSurat', $('#uploadFileSurat').prop('files')[0]);
                formData.append('inputNoSuratLhr', $('#inputNoSuratLhr').val());
                formData.append('inputTanggalSuratLhr', $('#inputTanggalSuratLhr').val());
                formData.append('uploadFileLhr', $('#uploadFileLhr').prop('files')[0]);
                formData.append('idVersion',  $('#idVersion').val());

                showLoading();
                $.ajax({
                    url: "/service-monitoring/aplikasi/simpan-surat",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function () {
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Disimpan.",
                            icon: "success"
                        }).then(function () {
                            $('#formTambahSurat')[0].reset();
                            $('#tabelSurat').DataTable().ajax.reload(null, false);
                            document.getElementById("labelUploadFileSurat").innerText='';
                            document.getElementById("labelUploadFileLhr").innerText='';
                        });
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        var tabelSurat = $('#tabelSurat').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-surat/"+$('#idVersion').val(),
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
                {"data": "no_surat",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "perihal",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "stakeholder.nama_stakeholder",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "no_lhr",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusSurat('+row['id_surat']+')">\n' +
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

        if($('#cariTabelSurat').length > 0) {
            var filterSearch = document.querySelector('[data-surat="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelSurat.search(e.target.value).draw();
            });
        }
    };

    return {
        init: function () {
            dashboardStepper();
            handleTimStepper();
            handleDokumenStepper();
            handleSuratStepper();
        }
    };

}();

jQuery(document).ready(function () {
    KTDashboardStepperEditAplikasi.init();
});