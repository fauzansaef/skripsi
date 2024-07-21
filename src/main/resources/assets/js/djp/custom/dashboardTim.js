"use strict";
// Class definition

var KTDatatableDashboardTim = function () {

    var dashboardTim = function () {
        $("#tglKepTim").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y"
        });

        $('.custom-file-input').on('change', function() {
            var fileName = $(this).val().replace(/.*(\/|\\)/, '');
            $(this).next('.custom-file-label').addClass("selected").html(fileName.substring(0,30));
        });

    };

    var handleTim = function () {
        var tabelTim = $('#tabelTim').DataTable({
            "ajax": {
                "url": "/service-pengembangan/tim/list/"+$('#idVersion').val(),
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
                {"data": "proses.nama"},
                {"data": "role.nama"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusTim('+row['id_tim']+')">' +
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
                inputProsesPegawai: {required: true},
                inputNIPPendekPegawai: {required: true}

            },
            submitHandler: function () {
                $('#modalTambahBagianTim').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-pengembangan/tim/simpan-tim",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputNamaPegawai: $('#inputNamaPegawai').val(),
                        inputRolePegawai: $('#inputRolePegawai').val(),
                        inputProsesPegawai: $('#inputProsesPegawai').val(),
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
                formData.append('uploadKepTim', $('#uploadKepTim').val());
                formData.append('idVersion', $('#idVersion').val());
                formData.append('uploadKepTim', $('#uploadKepTim').prop('files')[0]);

                showLoading();
                $.ajax({
                    url: "/service-pengembangan/tim/simpan-kep-tim",
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
                            text: "KEP Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                           location.reload();
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
            dashboardTim();
            handleTim();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardTim.init();
});