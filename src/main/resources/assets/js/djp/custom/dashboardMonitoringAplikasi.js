"use strict";
// Class definition

var KTDatatableDashboardMonitoringAplikasi = function () {

    var monitoringAplikasi = function () {
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

        $("#inputTanggalSurat").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y"
        });

        $("#inputTanggalSuratLhr").flatpickr({
            todayBtn:  1,
            autoclose: true,
            dateFormat:"d-m-Y"
        });

    }

    var handleMonitoringProses = function () {
        var tabelMonitoringProses = $('#tabelMonitoringProses').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-proses",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.v1 = $('#cariSeksiMonitoringProses').val();
                    d.v2 = $('#cariStatusMonitoringProses').val();
                    d.v3 = $('#cariTahunMonitoringProses').val();
                }
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "bScrollX": true,
            "pageLength": 50,
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
                {"data": "id_version",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['2']){
                            return '<span href="#" onclick="goToDaftarVersioning('+row['0']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['5']+' Ver - '+row['1']+'</span>\n' +
                                ' <span class="text-muted fw-bold d-block" style="font-size: 12px;">'+row['2'].substring(0,200)+'</span>';
                        } else {
                            return '<span href="#" onclick="goToDaftarVersioning('+row['0']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['5']+' Ver - '+row['1']+'</span>';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['8']===null){
                            row['8']= "-";
                        }

                        if(row['9']===null){
                            row['9']= "-";
                        }

                        if(row['10']===null){
                            row['10']= "-";
                        }

                        if(row['11']===null){
                            row['11']= "-";
                        }

                        return '<p><b>Perencanaan :</b>  '+row['8']+'</p>' + '<p><b>Pengembangan :</b>  '+row['9']+'</p>' + '<p><b>Pengujian :</b>  '+row['10']+'</p>' + '<p><b>Deploy :</b>  '+row['11']+'</p>';
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return row['3']+' - '+row['4'];
                    }
                },
                {"data": "7"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['12'] != null) {
                            var result = row['12'].split(',');

                            if(result[1] !== undefined){
                                return '<div class="d-flex align-items-center mb-8">' +
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[1].substring(10, result[1].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+ result[1].substring(0, 10)+'</span> ' +
                                    '</div>' +
                                    '<span class="badge badge-light-success fs-8 fw-bolder">-</span>'+
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[0].substring(10, result[1].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+result[0].substring(0, 10)+'</span> ' +
                                    '</div>' +
                                    '</div>';
                            }else{
                                return '<div class="d-flex align-items-center mb-8">' +
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[0].substring(10, result[0].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+result[0].substring(0, 10)+'</span> ' +
                                    '</div>';
                            }


                        }else{
                            return '-';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['13']===null && row['14']===null) {
                            return '<p>Tidak ada kebutuhan</p>'
                        } else{
                            return '<p class="text-danger">'+row['13']+'</p><br><p class="text-success">'+row['14']+'</p>'
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        var buttonPertanyaan = '';
                        if(row['15'] > 0){
                            var buttonPertanyaan = '<span class="symbol-badge badge badge-circle bg-danger start-100">'+row['15']+'</span>';
                        }
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToDetailAplikasi('+row['0']+')">\n ' +
                            ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg> ' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-sm btn-bg-light btn-active-color-primary me-1 symbol symbol-25px" title="Tanya Jawab" onclick="goToTanyaJawab('+row['0']+')">\n' +
                            '\t<div class="symbol-label fs-2 fw-bold" style="background-color: transparent;">\n' +
                            '\t\t<span class="svg-icon svg-icon-3">\n' +
                            '\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '\t\t\t\t<path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor"></path>\n' +
                            '                <rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor"></rect>\n' +
                            '                <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>\n' +
                            '            </svg>\n' +
                            '        </span>\n' +
                            '\t</div>'+buttonPertanyaan+' \n' +
                            '</button>';
                    }
                }
            ],
            "createdRow": function( row, data, dataIndex ) {
                if(data['12'] === null) {
                    $(row).find('td:eq(5)').addClass('belum-ada-progress');
                }else{
                    var result = data['12'].split(',');
                    var tanggal = result[0].substring(0, 10);
                    var currentDate = moment();
                    currentDate = currentDate.subtract(14, "days").toDate();
                    tanggal = new Date(tanggal);
                    if(tanggal < currentDate){
                        $(row).find('td:eq(5)').addClass('belum-ada-progress');
                    }
                }
            }
        });

        if ($('#cariTabelMonitoringProses').length > 0) {
            var filterSearch = document.querySelector('[data-monitoringproses="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelMonitoringProses.search(e.target.value).draw();
            });
        }
    };

    var handleMonitoringPublish = function () {
        var tabelMonitoringPublish = $('#tabelMonitoringPublish').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-publish",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.v1 = $('#cariSeksiMonitoringPublish').val();
                    d.v2 = $('#cariStatusMonitoringPublish').val();
                    d.v3 = $('#cariTahunMonitoringPublish').val();
                }
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "bScrollX": true,
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
                {"data": "id_version",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['2'] !== null){
                            return '<span href="#" onclick="goToDaftarVersioning('+row['0']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['5']+' Ver - '+row['1']+'</span>\n' +
                                ' <span class="text-muted fw-bold d-block" style="font-size: 12px;">'+row['2'].substring(0,200)+'</span>';

                        } else {
                            return '<span href="#" onclick="goToDaftarVersioning('+row['0']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['5']+' Ver - '+row['1']+'</span>';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['8']===null){
                            row['8']= "-";
                        }

                        if(row['9']===null){
                            row['9']= "-";
                        }

                        if(row['10']===null){
                            row['10']= "-";
                        }

                        if(row['11']===null){
                            row['11']= "-";
                        }

                        return '<p><b>Perencanaan :</b>  '+row['8']+'</p>' + '<p><b>Pengembangan :</b>  '+row['9']+'</p>' + '<p><b>Pengujian :</b>  '+row['10']+'</p>' + '<p><b>Deploy :</b>  '+row['11']+'</p>';
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return row['3']+' - '+row['4'];
                    }
                },
                {"data": "7"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['12'] != null) {
                            var result = row['12'].split(',');

                            if(result[1] !== undefined){
                                return '<div class="d-flex align-items-center mb-8">' +
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[1].substring(10, result[1].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+ result[1].substring(0, 10)+'</span> ' +
                                    '</div>' +
                                    '<span class="badge badge-light-success fs-8 fw-bolder">-</span>'+
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[0].substring(10, result[1].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+result[0].substring(0, 10)+'</span> ' +
                                    '</div>' +
                                    '</div>';
                            }else{
                                return '<div class="d-flex align-items-center mb-8">' +
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[0].substring(10, result[0].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+result[0].substring(0, 10)+'</span> ' +
                                    '</div>';
                            }


                        }else{
                            return '-';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['13']===null && row['14']===null) {
                            return '<p>Tidak ada kebutuhan</p>'
                        } else{
                            return '<p class="text-danger">'+row['13']+'</p><br><p class="text-success">'+row['14']+'</p>'
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        var buttonPertanyaan = '';
                        if(row['15'] > 0){
                            var buttonPertanyaan = '<span class="symbol-badge badge badge-circle bg-danger start-100">'+row['15']+'</span>';
                        }
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToDetailAplikasi('+row['0']+')">\n ' +
                            ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg> ' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-sm btn-bg-light btn-active-color-primary me-1 symbol symbol-25px" title="Tanya Jawab" onclick="goToTanyaJawab('+row['0']+')">\n' +
                            '\t<div class="symbol-label fs-2 fw-bold" style="background-color: transparent;">\n' +
                            '\t\t<span class="svg-icon svg-icon-3">\n' +
                            '\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '\t\t\t\t<path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor"></path>\n' +
                            '                <rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor"></rect>\n' +
                            '                <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>\n' +
                            '            </svg>\n' +
                            '        </span>\n' +
                            '\t</div>'+buttonPertanyaan+' \n' +
                            '</button>';
                    }
                }
            ],
            "createdRow": function( row, data, dataIndex ) {
                if(data['12'] === null) {
                    $(row).addClass('belum-ada-progress');
                }else{
                    var result = data['12'].split(',');
                    var tanggal = result[0].substring(0, 10);
                    var currentDate = moment();
                    currentDate = currentDate.subtract(14, "days").toDate();;
                    tanggal = new Date(tanggal);
                    if(tanggal < currentDate){
                        $(row).addClass('belum-ada-progress');
                    }
                }
            }
        });

        if ($('#cariTabelMonitoringPublish').length > 0) {
            var filterSearch = document.querySelector('[data-monitoringpublish="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelMonitoringPublish.search(e.target.value).draw();
            });
        }
    };


    var handleMonitoringPembatalan = function () {
        var tabelMonitoringPembatalan = $('#tabelMonitoringPembatalan').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-pembatalan",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.v1 = $('#cariSeksiMonitoringPembatalan').val();
                    d.v2 = $('#cariStatusMonitoringPembatalan').val();
                    d.v3 = $('#cariTahunMonitoringPembatalan').val();
                }
            },
            "sAjaxDataProp": "",
            "order": [[0, "asc"]],
            "processing": true,
            "bDestroy" : true,
            "bScrollX": true,
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
                {"data": "id_version",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['2'] !== null){
                            return '<span href="#" onclick="goToDaftarVersioning('+row['0']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['5']+' Ver - '+row['1']+'</span>\n' +
                                ' <span class="text-muted fw-bold d-block" style="font-size: 12px;">'+row['2'].substring(0,200)+'</span>';

                        } else {
                            return '<span href="#" onclick="goToDaftarVersioning('+row['0']+')" class="text-primary fw-bolder text-hover-primary mb-1 fs-6">'+row['5']+' Ver - '+row['1']+'</span>';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['8']===null){
                            row['8']= "-";
                        }

                        if(row['9']===null){
                            row['9']= "-";
                        }

                        if(row['10']===null){
                            row['10']= "-";
                        }

                        if(row['11']===null){
                            row['11']= "-";
                        }

                        return '<p><b>Perencanaan :</b>  '+row['8']+'</p>' + '<p><b>Pengembangan :</b>  '+row['9']+'</p>' + '<p><b>Pengujian :</b>  '+row['10']+'</p>' + '<p><b>Deploy :</b>  '+row['11']+'</p>';
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return row['3']+' - '+row['4'];
                    }
                },
                {"data": "7"},
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['12'] != null) {
                            var result = row['12'].split(',');

                            if(result[1] !== undefined){
                                return '<div class="d-flex align-items-center mb-8">' +
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[1].substring(10, result[1].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+ result[1].substring(0, 10)+'</span> ' +
                                    '</div>' +
                                    '<span class="badge badge-light-success fs-8 fw-bolder">-</span>'+
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[0].substring(10, result[1].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+result[0].substring(0, 10)+'</span> ' +
                                    '</div>' +
                                    '</div>';
                            }else{
                                return '<div class="d-flex align-items-center mb-8">' +
                                    '<div class="flex-grow-1"> ' +
                                    '<a class="text-gray-800 text-hover-primary fw-bolder fs-6">' + result[0].substring(10, result[0].size) + '%</a> ' +
                                    '<span class="text-muted fw-bold d-block">'+result[0].substring(0, 10)+'</span> ' +
                                    '</div>';
                            }


                        }else{
                            return '-';
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        if(row['13']===null && row['14']===null) {
                            return '<p>Tidak ada kebutuhan</p>'
                        } else{
                            return '<p class="text-danger">'+row['13']+'</p><br><p class="text-success">'+row['14']+'</p>'
                        }
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        var buttonPertanyaan = '';
                        if(row['15'] > 0){
                            var buttonPertanyaan = '<span class="symbol-badge badge badge-circle bg-danger start-100">'+row['15']+'</span>';
                        }
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToDetailAplikasi('+row['0']+')">\n ' +
                            ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg> ' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-sm btn-bg-light btn-active-color-primary me-1 symbol symbol-25px" title="Tanya Jawab" onclick="goToTanyaJawab('+row['0']+')">\n' +
                            '\t<div class="symbol-label fs-2 fw-bold" style="background-color: transparent;">\n' +
                            '\t\t<span class="svg-icon svg-icon-3">\n' +
                            '\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '\t\t\t\t<path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor"></path>\n' +
                            '                <rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor"></rect>\n' +
                            '                <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>\n' +
                            '            </svg>\n' +
                            '        </span>\n' +
                            '\t</div>'+buttonPertanyaan+' \n' +
                            '</button>';
                    }
                }
            ],
            "createdRow": function( row, data, dataIndex ) {
                if(data['12'] === null) {
                    $(row).addClass('belum-ada-progress');
                }else{
                    var result = data['12'].split(',');
                    var tanggal = result[0].substring(0, 10);
                    var currentDate = moment();
                    currentDate = currentDate.subtract(14, "days").toDate();
                    tanggal = new Date(tanggal);
                    if(tanggal < currentDate){
                        $(row).addClass('belum-ada-progress');
                    }
                }
            }
        });

        if ($('#cariTabelMonitoringPembatalan').length > 0) {
            var filterSearch = document.querySelector('[data-monitoringpembatalan="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelMonitoringPembatalan.search(e.target.value).draw();
            });
        }
    };

    var handleSuratByMonitoring = function () {

        var tabelSuratByMonitoring = $('#tabelSuratByMonitoring').DataTable({
            "ajax": {
                "url": "/service-monitoring/aplikasi/list-surat-by-monitoring/"+$('#idVersion').val(),
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
                "sSearch": "Cari:",
            },
            "columns": [
                {"data": "id_surat",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_surat'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+cekNull(row['no_surat'])+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/1" target="_blank">' + cekNull(row['file_surat']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">'+row['no_surat']+'</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">'+cekNull(row['jenis_dokumen'])+' - '+cekNull(row['tgl_surat'])+'</span> ';
                        }
                    }
                },
                {"data": "perihal",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "stakeholder",
                    render: function (data, type, row) {
                        return cekNull(data);
                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        if(row['file_lhr'] != null){
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ' +
                                '<a href="/manajemen/surat/download/' + row['id_surat'] + '/2"target="_blank">' + cekNull(row['file_lhr']) + '</a>';
                        } else {
                            return '<a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">' + cekNull(row['no_lhr']) + '</a>\n' +
                                '<span class="text-muted kt-font-success fw-bold d-block">' + cekNull(row['tgl_lhr']) + '</span> ';
                        }

                    }
                },
                {"data": "null",
                    render: function (data, type, row) {
                        var aplikasi = cekNull(row['aplikasi']);
                        var versioning = cekNull(row['versioning']);
                        return aplikasi+" "+versioning;
                    }
                },
                {
                    "data": "null",
                    render: function (data, type, row) {
                        return '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" title="Edit" onclick="goToEditSurat('+row['id_surat']+')">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                            '                   <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</button>\n' +
                            '<button class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" title="Hapus" onclick="hapusSurat('+row['id_surat']+')">\n' +
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


        $("#formTambahSurat").validate({
            rules: {
                inputNoSurat: {required: true},
                inputInstansiPenerbitSurat: {required: true},
                inputJenisSurat: {required: true},
                inputTanggalSurat: {required: true},
            },

            invalidHandler: function() {
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
                formData.append('inputAplikasiSurat',  $('#inputAplikasiSurat').val());
                formData.append('inputVersionAplikasiSurat', $('#inputVersionAplikasiSurat').val());

                showLoading();
                $.ajax({
                    url: "/service-manajemen/surat/simpan",
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
                            window.location.href = "/monitoring/aplikasi/list-surat-by-monitoring/"+$('#inputVersionAplikasiSurat').val();
                        });
                    },
                    error: function () {
                        errorResult();
                    }
                });
            }
        });

        $("#formEditSurat").validate({
            rules: {
                inputNoSurat: {required: true},
                inputInstansiPenerbitSurat: {required: true},
                inputJenisSurat: {required: true},
                inputTanggalSurat: {required: true},
            },

            invalidHandler: function() {
                swal.fire({
                    "icon":"error",
                    "text": "Form belum lengkap.",
                    "confirmButtonClass": "btn btn-secondary"
                });
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

                formData.append('idSurat', $('#idSurat').val());
                formData.append('inputNoSurat', $('#inputNoSurat').val());
                formData.append('inputInstansiPenerbitSurat', $('#inputInstansiPenerbitSurat').val());
                formData.append('inputJenisSurat', $('#inputJenisSurat').val());
                formData.append('inputTanggalSurat', $('#inputTanggalSurat').val());
                formData.append('inputPerihalSurat', $('#inputPerihalSurat').val());
                formData.append('uploadFileSurat', $('#uploadFileSurat').prop('files')[0]);
                formData.append('inputNoSuratLhr', $('#inputNoSuratLhr').val());
                formData.append('inputTanggalSuratLhr', $('#inputTanggalSuratLhr').val());
                formData.append('uploadFileLhr', $('#uploadFileLhr').prop('files')[0]);
                formData.append('inputAplikasiSurat', $('#inputAplikasiSurat').val());
                formData.append('inputVersionAplikasiSurat', $('#inputVersionAplikasiSurat').val());

                showLoading();
                $.ajax({
                    url: "/service-manajemen/surat/edit",
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
                            text: "Data Berhasil Disimpan",
                            icon: "success"
                        }).then(function () {
                            window.location.href = "/monitoring/aplikasi/list-surat-by-monitoring/"+$('#idVersion').val();
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
            monitoringAplikasi();
            handleMonitoringProses();
            handleMonitoringPublish();
            handleMonitoringPembatalan();
            handleSuratByMonitoring();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardMonitoringAplikasi.init();
});