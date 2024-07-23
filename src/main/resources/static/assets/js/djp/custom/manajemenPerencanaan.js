$(".js-data-example-ajax").select2({
    ajax: {
        url: function (params) {
            return "/api/v1/referensi/pegawai_tiks";
        },
        delay: 250,
        data: function (params) {
            return {
                nama: params.term,
            };
        },
        processResults: function (data, params) {
            var result = data.map(function(item){
                return{id:item.idPegawai, text:item.nama, nip:item.nip};
            });
            return {
                results: result,
            };
        },
        cache: true
    },
    placeholder: 'Mencari Nama Pegawai',
    minimumInputLength: 5,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
});

function formatRepo (repo) {
    if (repo.loading) {
        return repo.text;
    }

    var $container = $(
        "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__nama'></div>" +
        "<div class='select2-result-repository__nip'></div>" +
        "</div>" +
        "</div>"
    );

    $container.find(".select2-result-repository__nama").text(repo.text);
    $container.find(".select2-result-repository__nip").text(repo.nip);

    return $container;
}

function formatRepoSelection (repo) {
    // var $container = jQuery("<span class='selectedP['>"+repo.name+"</span>");
    // return $container;
    return repo.text;
}


"use strict";

// Class definition
var StepperEditAplikasi = function () {
    var validator;
    var stepper;

    // Initalize Form Validation
    var initValidation = function() {
        validator = $('#simpanDetailAplikasi').validate({
            ignore: ":hidden",
            // Validation rules
            rules: {
                //= Step 1
                inputKodeProyek: {required: true},
                inputVersion: {required: true},
                inputKeteranganVersion: {required: true},
                inputSubditPengampuAplikasi: {required: true},
                inputSeksiPengampuAplikasi: {required: true},
                inputStakeholderAplikasi: {required: true},
                inputKategoriAplikasi: {required: true},
                inputDeadline: {required: false}
            },

            // Display error
            invalidHandler: function() {
                swal.fire({
                    "icon":"error",
                    "text": "Form belum lengkap/belum sesuai.",
                    "confirmButtonClass": "btn btn-secondary"
                });
            }
        });
    };

    // Initialize Stepper
    var element = document.querySelector("#stepperEditAplikasi");
    stepper = new KTStepper(element);

    // Handle next step
    stepper.on("kt.stepper.next", function (stepper) {
        if(stepper.currentStepIndex === 1) {
            showLoading();
            if (validator.form()) {
                handleSimpanAplikasi();
            }
        }else{
            stepper.goNext();
        }
    });

    // Handle previous step
    stepper.on("kt.stepper.previous", function (stepper) {
        stepper.goPrevious();
    });

    // On change
    stepper.on('kt.stepper.changed', function(stepper) {
    });

    stepper.on("kt.stepper.click", function (stepper) {
        stepper.goTo(stepper.getClickedStepIndex());
    });

    var initSubmit = function() {
        var btn = document.getElementById('btnSimpanFormEditAplikasi');
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoading();
            window.location.href = window.location.origin + "/perencanaan/reviewlist";
        });
    };

    var showLoading = function() {
        Swal.fire({
            title: "Mohon Menunggu",
            text: "Data sedang diproses...",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        });
        Swal.showLoading();
    };

    function handleSimpanAplikasi() {
        // var array = [];
        // var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        //
        // for (var i = 0; i < checkboxes.length; i++) {
        //     array.push(checkboxes[i].value)
        // }


        $.ajax({
            url: "/api/v1/perencanaan/versi_aplikasis/update_versi_kode_project/"+$('#idVersion').val(),
            type: "patch",
            headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            contentType: "application/json",
            data: JSON.stringify({
                versi: $('#inputVersion').val(),
                keteranganVersi: $('#inputKeteranganVersion').val(),
                deadline: $('#inputDeadline').val(),
                kodeProject: $('#inputKodeProyek').val(),
            }),
            success: function (data) {
                if (data.code === 200) {
                    swal.fire({
                        title: "SUKSES",
                        text: "Detail Aplikasi Berhasil Disimpan",
                        icon: "success"
                    }).then(function () {
                        stepper.goNext();
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

    return {
        init: function() {
            initSubmit();
            initValidation();
        }
    };
}();

jQuery(document).ready(function() {
    StepperEditAplikasi.init();
});

$("#formTambahTimProyek").validate({
    rules: {
        inputSearchPegawai: {required: true},
        inputRolePegawai: {required: true},
    },
    submitHandler: function () {
        // $('#modalTambahBagianTim').modal('hide');
        showLoading();
        $.ajax({
            url: "/api/v1/perencanaan/versi_aplikasis/tim_proyek/"+$('#idVersion').val(),
            type: "patch",
            headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            contentType: "application/json",
            data: JSON.stringify([{
                idPegawai: $('#inputSearchPegawai').val(),
                idRole: $('#inputRolePegawai').val(),
                idProses: 1,
            }]),
            success: function (data) {
                if (data.code === 200) {
                    swal.fire({
                        title: "SUKSES",
                        text: "Data Berhasil Ditambah",
                        icon: "success"
                    }).then(function () {
                        $('#tabelTimProyek').DataTable().ajax.reload(null, false);
                        // $('#formTambahTim')[0].reset();
                        // $("#detailPegawai").css("display","none");
                        // $("#inputNamaPegawai").val("");
                        // $("#inputNIPPendekPegawai").val("");
                        // $('#inputRolePegawai').get(0).selectedIndex = 1;
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
var KTDashboardStepperEditProyek = function () {
var handleTimStepper2 = function () {
    var tabelTim = $('#tabelTimProyek').DataTable({
        "ajax": {
            "url": "/api/v1/perencanaan/versi_aplikasis/tim_proyek/"+$('#idVersion').val(),
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
            {"data": "namaPegawai"},
            {"data": "role.nama"},
            {
                "data": "null",
                render: function (data, type, row) {
                    return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusTimStepperProyek('+row['idTim']+')">' +
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

    if($('#cariTabelTimProyek').length > 0) {
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

    $("#formUploadKepTimProyek").validate({
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
            formData.append('fileKepTim', $('#uploadKepTim').prop('files')[0]);

            $.ajax({
                url: "/api/v1/perencanaan/versi_aplikasis/upload_file_kep_tim/"+$('#idVersion').val(),
                type: "patch",
                headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if(data.code != 200){
                        errorResult();
                    }else {
                        swal.fire({
                            title: "SUKSES",
                            text: "KEP Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                            $('#formUploadKepTimProyek')[0].reset();
                            $('#tabelKepTimProyek').DataTable().ajax.reload(null, false);
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



    $("#formcontentDokumenDasarPengembangan").validate({
        rules: {
            tglDokumenDasar: {required: true},
            uploadDokumenDasarProChar: {required: true}
        },
        submitHandler: function () {
            showLoading();

            if ($("#uploadDokumenDasarProChar")[0].files[0].size > 31457280) {
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
            formData.append('tglDokumen', $('#tglDokumenDasar').val());
            formData.append('file', $('#uploadDokumenDasarProChar').prop('files')[0]);

            $.ajax({
                url: "/api/v1/perencanaan/versi_aplikasis/upload_file_project_charter/"+$('#idVersion').val(),
                type: "patch",
                headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if(data.code != 200){
                        errorResult();
                    }else {
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                            $('#formcontentDokumenDasarPengembangan')[0].reset();
                            $('#tabelDokDasarProjectCharter').DataTable().ajax.reload(null, false);
                            document.getElementById("labelUploadDokumenDasar").innerText = '';
                        });
                    }
                },
                error: function () {
                    errorResult();
                }
            });
        }
    });

    $("#formcontentDokumenPerencanaan").validate({
        rules: {
            tglDokumenPerencanaan: {required: true},
            uploadDokumenPmp: {required: true}
        },
        submitHandler: function () {
            showLoading();

            if ($("#uploadDokumenPmp")[0].files[0].size > 31457280) {
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
            formData.append('tglDokumen', $('#tglDokumenPerencanaan').val());
            formData.append('file', $('#uploadDokumenPmp').prop('files')[0]);

            $.ajax({
                url: "/api/v1/perencanaan/versi_aplikasis/upload_file_pmp/"+$('#idVersion').val(),
                type: "patch",
                headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if(data.code != 200){
                        errorResult();
                    }else {
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                            $('#formcontentDokumenPerencanaan')[0].reset();
                            $('#tabelDokManPlan').DataTable().ajax.reload(null, false);
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

    $("#formcontentDokumenStudiKel").validate({
        rules: {
            tglDokumenStudiKel: {required: true},
            uploadDokumenStudiKel: {required: true}
        },
        submitHandler: function () {
            showLoading();

            if ($("#uploadDokumenStudiKel")[0].files[0].size > 31457280) {
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
            formData.append('tglDokumen', $('#tglDokumenStudiKel').val());
            formData.append('file', $('#uploadDokumenStudiKel').prop('files')[0]);

            $.ajax({
                url: "/api/v1/perencanaan/versi_aplikasis/upload_file_kajian/"+$('#idVersion').val(),
                type: "patch",
                headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if(data.code != 200){
                        errorResult();
                    }else {
                        swal.fire({
                            title: "SUKSES",
                            text: "Dokumen Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                            $('#formcontentDokumenStudiKel')[0].reset();
                            $('#tabelDokStudiKel').DataTable().ajax.reload(null, false);
                            document.getElementById("labelUploadDokumenStudiKel").innerText = '';
                        });
                    }
                },
                error: function () {
                    errorResult();
                }
            });
        }
    });

    $('#uploadDokumenStudiKel').change(function() {
        var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,70);
        $('#labelUploadDokumenStudiKel').text(fileName.substring(0,50) + "...");
    });

    $('#uploadDokumenDasarProChar').change(function() {
        var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,70);
        $('#labelUploadDokumenDasarProChar').text(fileName.substring(0,50) + "...");
    });

    $('#uploadDokumenPmp').change(function() {
        var fileName = $(this).val().replace(/.*(\/|\\)/, '').substring(0,70);
        $('#labelUploadDokumenPmp').text(fileName.substring(0,50) + "...");
    });

    $("#tglDokumenStudiKel").flatpickr({
        todayBtn:  1,
        autoclose: true,
        dateFormat:"Y-m-d"
    });

    $("#tglDokumenDasar, #tglDokumenPerencanaan, #tglDokumenPengembangan, #tglDokumenPengujian, #tglDokumenDeployment").flatpickr({
        todayBtn:  1,
        autoclose: true,
        dateFormat:"Y-m-d"
    });

    $('#tabelKepTimProyek').DataTable({
        "ajax": {
            "url": "/api/v1/perencanaan/versi_aplikasis/"+$('#idVersion').val(),
            "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            "dataSrc": function(json){
                return [json];
            },
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
                "data": "noKepTim",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return data;
                    }
                }
            },
            {"data": "tglKeptim",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return moment(new Date(data)).format("DD MMM yyyy");
                    }
                }
            },
            {
                "data": "fileKeptim",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return data;
                    }
                }
            },
            {
                "data": "idVersion",
                render: function (data, type, row) {
                    var link = '/pengembangan/versioning/download/' + data + '/2';
                    if(row['fileKeptim'] == null){
                        return "-"
                    }else {
                        return '<div class="d-flex align-items-senter"> ' +
                            '<div class="d-flex align-items-senter"> ' +
                            '<a  href="' + link + '" target="_blank"><img src="/assets/media/files/pdf.svg" style="width: 40px; margin-left: -5px;"></a> ' +
                            '</div> ' +
                            '</div> ';
                    }
                }
            }
        ]
    });

    $('#tabelDokDasarProjectCharter').DataTable({
        "ajax": {
            "url": "/api/v1/perencanaan/versi_aplikasis/"+$('#idVersion').val(),
            "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            "dataSrc": function(json){
                return [json];
            },
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
            {"data": "wktProjectCharter",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return moment(new Date(data)).format("DD MMM yyyy");
                    }
                }
            },
            {
                "data": "projectCharter",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return data;
                    }
                }
            },
            {
                "data": "idVersion",
                render: function (data, type, row) {
                    var link = '/pengembangan/versioning/download/' + data + '/2';
                    if(row['projectCharter'] == null){
                        return "-"
                    }else {
                        return '<div class="d-flex align-items-senter"> ' +
                            '<div class="d-flex align-items-senter"> ' +
                            '<a  href="' + link + '" target="_blank"><img src="/assets/media/files/pdf.svg" style="width: 40px; margin-left: -5px;"></a> ' +
                            '</div> ' +
                            '</div> ';
                    }
                }
            }
        ]
    });

    $('#tabelDokManPlan').DataTable({
        "ajax": {
            "url": "/api/v1/perencanaan/versi_aplikasis/"+$('#idVersion').val(),
            "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            "dataSrc": function(json){
                return [json];
            },
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
            {"data": "wktPmp",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return moment(new Date(data)).format("DD MMM yyyy");
                    }
                }
            },
            {
                "data": "pmp",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return data;
                    }
                }
            },
            {
                "data": "idVersion",
                render: function (data, type, row) {
                    var link = '/pengembangan/versioning/download/' + data + '/2';
                    if(row['pmp'] == null){
                        return "-"
                    }else {
                        return '<div class="d-flex align-items-senter"> ' +
                            '<div class="d-flex align-items-senter"> ' +
                            '<a  href="' + link + '" target="_blank"><img src="/assets/media/files/pdf.svg" style="width: 40px; margin-left: -5px;"></a> ' +
                            '</div> ' +
                            '</div> ';
                    }
                }
            }
        ]
    });

    $('#tabelDokStudiKel').DataTable({
        "ajax": {
            "url": "/api/v1/perencanaan/versi_aplikasis/"+$('#idVersion').val(),
            "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            "dataSrc": function(json){
                return [json];
            },
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
            {"data": "tglKajian",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return moment(new Date(data)).format("DD MMM yyyy");
                    }
                }
            },
            {
                "data": "kajian",
                render: function (data, type, row) {
                    if(data == null){
                        return "-";
                    }else{
                        return data;
                    }
                }
            },
            {
                "data": "idVersion",
                render: function (data, type, row) {
                    var link = '/pengembangan/versioning/download/' + data + '/2';
                    if(row['kajian'] == null){
                        return "-"
                    }else {
                        return '<div class="d-flex align-items-senter"> ' +
                            '<div class="d-flex align-items-senter"> ' +
                            '<a  href="' + link + '" target="_blank"><img src="/assets/media/files/pdf.svg" style="width: 40px; margin-left: -5px;"></a> ' +
                            '</div> ' +
                            '</div> ';
                    }
                }
            }
        ]
    });

    $("#formTambahDokumenLainya").validate({
        rules: {
            inputNamaDokumen: {required: true},
            inputPembuatDokumen: {required: true},
            uploadDokumenLainnya: {required: true}
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
            // formData.append('idVersion', $('#idVersion').val());
            formData.append('namaDokumen', $('#inputNamaDokumen').val());
            formData.append('pembuat', $('#inputPembuatDokumen').val());
            formData.append('file', $('#uploadDokumenLainnya').prop('files')[0]);
            formData.append('idProses', 1);

            showLoading();
            $.ajax({
                url: "/api/v1/perencanaan/versi_aplikasis/upload_dokumen_lainnya/"+$('#idVersion').val(),
                type: "patch",
                headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if(data.code != 200){
                        errorResult();
                    }else{
                        swal.fire({
                            title: "SUKSES",
                            text: "Data Berhasil Ditambah",
                            icon: "success"
                        }).then(function () {
                            $('#tabelDokumen').DataTable().ajax.reload(null, false);
                            $('#formTambahDokumenLainya')[0].reset();
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
};

return {
    init: function () {
        // dashboardStepper();
        handleTimStepper2();
        // handleDokumenStepper();
        // handleSuratStepper();
    }
};
}();

jQuery(document).ready(function () {
    KTDashboardStepperEditProyek.init();
    setTimeout(validasiManajemenPerencanaan, 3000);

    $('.validasi').click(function(){
        // Your code goes here
        validasiManajemenPerencanaan();
    });
});

function validasiManajemenPerencanaan(){
    var tanggalMulaiCoding = $('#tglAwalCoding').val();
    var deadline = $('#inputDeadline').val();
    var checkTim = checkRoleTim();
    $('.validasiCoding').attr('hidden', true);
    $('.validasiDeadline').attr('hidden', true);
    $('.validasiTim').attr('hidden', true);
    if(!checkTim){
        console.log('tim is null or empty');
        $('.validasiTim').removeAttr('hidden');
    }
    if (!tanggalMulaiCoding) {
        // The value of tanggalMulaiCoding is null or empty
        console.log('tanggalMulaiCoding is null or empty');
        $('.validasiCoding').removeAttr('hidden');
    }
    if (!deadline) {
        // The value of deadline is null or empty
        console.log('deadline is null or empty');
        $('.validasiDeadline').removeAttr('hidden');
    }
    if(checkTim && tanggalMulaiCoding && deadline){
        $('#contentValidasiManPerencanaan').attr('hidden', true);
        $('#contentKepTimBody').removeAttr('hidden');
    }

}
function checkRoleTim(){
    var developerCount = 0;
    var systemAnalystCount = 0;

    $("#tabelTimProyek tbody tr").each(function() {
        var role = $(this).find("td:nth-child(3)").text().trim();
        if (role === "Developer") {
            developerCount++;
        } else if (role === "System Analyst - Utama") {
            systemAnalystCount++;
        }
    });

    if (developerCount >= 1 && systemAnalystCount >= 1) {
        return true;
        // both roles are present
    } else {
        return false;
        // one or both roles are missing
    }
}

function hapusTimStepperProyek(id) {
    swal.fire({
        title: "Hapus Tim?",
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
                url: "/api/v1/perencanaan/versi_aplikasis/tim_proyek/"+id,
                type: "delete",
                headers: {"X-CSRF-TOKEN": token},
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
                            $('#tabelTimProyek').DataTable().ajax.reload(null, false);
                        });
                    } else {
                        errorResult();
                    }
                }
            });
        }
    });
}