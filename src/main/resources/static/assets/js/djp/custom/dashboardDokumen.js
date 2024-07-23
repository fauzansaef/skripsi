"use strict";
// Class definition

var KTDatatableDashboardDokumen = function () {

    var handleDokumen = function () {
        var tabelDokumen = $('#tabelDokumen').DataTable({
            "ajax": {
                "url": "/service-pengembangan/dokumen/list-dokumen-lainnya/"+$('#idVersion').val()+"/"+$('#idProses').val(),
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
                            ' <span class="text-muted fw-bold d-block">'+row['nama_pembuat_dokumen']+'-'+row['wkt_upload']+'</span>';
                    }
                },
                {"data": "proses"},
                {"data": "file_dokumen"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onclick="hapusDokumenLainnya('+row['id_dokumen']+')">' +
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

        $("#formTambahDokumenLainnya").validate({
            submitHandler: function () {
                showLoading();

                if(!$('#inputPembuatDokumen').val()) {
                    if (!$('#inputNamaDokumen').val()) {
                        if(!$('#uploadDokumenLainnya').prop('files')[0]){
                            swal.fire({
                                title: "ERROR",
                                text: "Form belum diisi",
                                icon: "error",
                                customClass: {
                                    confirmButton: "btn btn-danger"
                                }
                            });
                            return false;
                        } else {
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
                        }
                    }
                }

                var formData = new FormData();
                formData.append('idVersion', $('#idVersion').val());
                formData.append('idProses', $('#idProses').val());
                formData.append('inputNamaDokumen', $('#inputNamaDokumen').val());
                formData.append('inputPembuatDokumen', $('#inputPembuatDokumen').val());
                formData.append('uploadDokumenLainnya', $('#uploadDokumenLainnya').prop('files')[0]);

                showLoading();
                $.ajax({
                    url: "/service-pengembangan/dokumen/simpan-dokumen-lainnya",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelDokumen').DataTable().ajax.reload(null, false);
                                $('#formTambahDokumenLainnya')[0].reset();
                                $("#inputNamaDokumen").val("");
                                $("#inputPembuatDokumen").val("");
                                $("#uploadDokumenLainnya").val("");
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

        if($('#idProses').val() == '1') {
            if ($('#divDetailUploadProjectCharter').length <= 0) {
                document.getElementById('divUploadProjectCharter').style.display = "block";
            }

            if ($('#divDetailUploadProjectManajemenPlan').length <= 0) {
                document.getElementById('divUploadProjectManajemenPlan').style.display = "block";
            }

            if ($('#divDetailDokumenPengajuanPengembangan').length <= 0) {
                document.getElementById('divUploadDokumenPengajuanPengembangan').style.display = "block";
            }

            if ($('#divDetailDokumenKajian').length <= 0) {
                document.getElementById('divUploadDokumenKajian').style.display = "block";
            }
        }

        if($('#idProses').val() == '2') {
            if ($('#divDetailUploadUrs').length <= 0) {
                document.getElementById('divUploadUrs').style.display = "block";
            }

            if ($('#divDetailUploadSrs').length <= 0) {
                document.getElementById('divUploadSrs').style.display = "block";
            }
            if ($('#divDetailUploadSdd').length <= 0) {
                document.getElementById('divUploadSdd').style.display = "block";
            }
        }

        if($('#idProses').val() == '3') {
            if ($('#divDetailUploadTok').length <= 0) {
                document.getElementById('divUploadTok').style.display = "block";
            }

            if ($('#divDetailUploadUat').length <= 0) {
                document.getElementById('divUploadUat').style.display = "block";
            }

            if ($('#divDetailUploadNdDeploy').length <= 0) {
                document.getElementById('divUploadNdDeploy').style.display = "block";
            }

            if ($('#divDetailUploadPermohonanTok').length <= 0) {
                document.getElementById('divUploadPermohonanTok').style.display = "block";
            }

            if ($('#divDetailUploadPermohonanUat').length <= 0) {
                document.getElementById('divUploadPermohonanUat').style.display = "block";
            }
        }

        if($('#idProses').val() == '4') {
            if ($('#divDetailUploadNdRollout').length <= 0) {
                document.getElementById('divUploadNdRollout').style.display = "block";
            }
        }

        $("#formTambahDokumen").validate({
            submitHandler: function () {
                showLoading();

                var formData = new FormData();
                formData.append('idVersion', $('#idVersion').val());
                formData.append('idProses', $('#idProses').val());

                if($('#idProses').val() == '1') {
                    if (!$('#uploadProjectCharter').prop('files')[0]) {
                        if (!$('#uploadProjectManajemenPlan').prop('files')[0]) {
                            if (!$('#uploadDokumenPengajuanPengembangan').prop('files')[0]) {
                                if(!$('#uploadDokumenKajian').prop('files')[0]){
                                    swal.fire({
                                        title: "ERROR",
                                        text: "Form belum diisi",
                                        icon: "error",
                                        customClass: {
                                            confirmButton: "btn btn-danger"
                                        }
                                    });
                                    return false;
                                } else {
                                    if ($("#uploadDokumenKajian")[0].files[0].size > 31457280) {
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
                            } else {
                                if ($("#uploadDokumenPengajuanPengembangan")[0].files[0].size > 31457280) {
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
                        } else {
                            if ($("#uploadProjectManajemenPlan")[0].files[0].size > 31457280) {
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
                    } else {
                        if ($("#uploadProjectCharter")[0].files[0].size > 31457280) {
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
                    var url = "/service-pengembangan/dokumen/simpan-dokumen-perencanaan";
                    formData.append('uploadProjectCharter', $('#uploadProjectCharter').prop('files')[0]);
                    formData.append('uploadProjectManajemenPlan', $('#uploadProjectManajemenPlan').prop('files')[0]);
                    formData.append('uploadDokumenPengajuanPengembangan', $('#uploadDokumenPengajuanPengembangan').prop('files')[0]);
                    formData.append('uploadDokumenKajian', $('#uploadDokumenKajian').prop('files')[0]);
                }

                if($('#idProses').val() == '2') {
                    if (!$('#uploadUrs').prop('files')[0]) {
                        if (!$('#uploadSrs').prop('files')[0]) {
                            if (!$('#uploadSdd').prop('files')[0]) {
                                swal.fire({
                                    title: "ERROR",
                                    text: "Form belum diisi",
                                    icon: "error",
                                    customClass: {
                                        confirmButton: "btn btn-danger"
                                    }
                                });
                                return false;
                            } else {
                                if ($("#uploadSdd")[0].files[0].size > 31457280) {
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
                        } else {
                            if ($("#uploadSrs")[0].files[0].size > 31457280) {
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
                    } else {
                        if ($("#uploadUrs")[0].files[0].size > 31457280) {
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
                    var url = "/service-pengembangan/dokumen/simpan-dokumen-pengembangan";
                    formData.append('uploadUrs', $('#uploadUrs').prop('files')[0]);
                    formData.append('uploadSrs', $('#uploadSrs').prop('files')[0]);
                    formData.append('uploadSdd', $('#uploadSdd').prop('files')[0]);
                }

                if($('#idProses').val() == '3') {
                    if (!$('#uploadTok').prop('files')[0]) {
                        if (!$('#uploadUat').prop('files')[0]) {
                            if (!$('#uploadNdDeploy').prop('files')[0]) {
                                if (!$('#uploadPermohonanUat').prop('files')[0]) {
                                    if (!$('#uploadPermohonanTok').prop('files')[0]) {
                                        swal.fire({
                                            title: "ERROR",
                                            text: "Form belum diisi",
                                            icon: "error",
                                            customClass: {
                                                confirmButton: "btn btn-danger"
                                            }
                                        });
                                        return false;
                                    } else {
                                        if ($("#uploadPermohonanTok")[0].files[0].size > 31457280) {
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
                                } else {
                                    if ($("#uploadPermohonanUat")[0].files[0].size > 31457280) {
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

                            } else {
                                if ($("#uploadNdDeploy")[0].files[0].size > 31457280) {
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
                        } else {
                            if ($("#uploadUat")[0].files[0].size > 31457280) {
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
                    } else {
                        if ($("#uploadTok")[0].files[0].size > 31457280) {
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
                    var url = "/service-pengembangan/dokumen/simpan-dokumen-pengujian";
                    formData.append('uploadTok', $('#uploadTok').prop('files')[0]);
                    formData.append('uploadUat', $('#uploadUat').prop('files')[0]);
                    formData.append('uploadNdDeploy', $('#uploadNdDeploy').prop('files')[0]);
                    formData.append('uploadPermohonanTok', $('#uploadPermohonanTok').prop('files')[0]);
                    formData.append('uploadPermohonanUat', $('#uploadPermohonanUat').prop('files')[0]);
                }

                if($('#idProses').val() == '4') {
                    if (!$('#uploadNdRollout').prop('files')[0]) {
                        swal.fire({
                            title: "ERROR",
                            text: "Form belum diisi",
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-danger"
                            }
                        });
                        return false;
                    } else {
                        if ($("#uploadNdRollout")[0].files[0].size > 31457280) {
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

                    var url = "/service-pengembangan/dokumen/simpan-dokumen-deploy";
                    formData.append('uploadNdRollout', $('#uploadNdRollout').prop('files')[0]);
                }


                showLoading();
                $.ajax({
                    url: url,
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: formData,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                location.reload();
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
            handleDokumen();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardDokumen.init();
});