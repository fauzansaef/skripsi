"use strict";
// Class definition

var KTDatatableDashboardDiskusi = function () {

    var dashboardDiskusi = function () {
        $('#inputDetailPertanyaan').summernote({
            height: 150
        });

        $('#inputJawaban').summernote({
            height: 150
        });

        $('#editDetailPertanyaan').summernote({
            height: 150
        });

        $('#editJawaban').summernote({
            height: 150
        });

    }

    var handlePertanyaan = function () {
        var tabelTanyaJawab = $('#tabelTanyaJawab').DataTable({
            "ajax": {
                "url": "/service-diskusi/list-tanya-jawab",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.v1 = $('#cariPertanyaanByStatus').val();
                }
            },
            "sAjaxDataProp": "",
            "order": [],
            "processing": false,
            "bDestroy" : true,
            "bLengthChange" : false,
            "bInfo": false,
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
                    render: function (data, type, row) {
                        var iconStatus = '';
                        var buttonSolved = '';
                        var buttonEdit = '';
                        var buttonHapus = '';
                        if(row['status'] === '0'){
                            iconStatus =    '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-warning">\n' +
                                                '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                                '       <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM16 13.5L12.5 13V10C12.5 9.4 12.6 9.5 12 9.5C11.4 9.5 11.5 9.4 11.5 10L11 13L8 13.5C7.4 13.5 7 13.4 7 14C7 14.6 7.4 14.5 8 14.5H11V18C11 18.6 11.4 19 12 19C12.6 19 12.5 18.6 12.5 18V14.5L16 14C16.6 14 17 14.6 17 14C17 13.4 16.6 13.5 16 13.5Z" fill="currentColor"></path> ' +
                                                '       <rect x="11" y="19" width="10" height="2" rx="1" transform="rotate(-90 11 19)" fill="currentColor"></rect> ' +
                                                '       <rect x="7" y="13" width="10" height="2" rx="1" fill="currentColor"></rect> ' +
                                                '       <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"></path> ' +
                                                '   </svg>' +
                                                '</span>';

                        } else {
                            iconStatus =    '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-success">\n' +
                                                '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                                '        <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM11.7 17.7L16 14C16.4 13.6 16.4 12.9 16 12.5C15.6 12.1 15.4 12.6 15 13L11 16L9 15C8.6 14.6 8.4 14.1 8 14.5C7.6 14.9 8.1 15.6 8.5 16L10.3 17.7C10.5 17.9 10.8 18 11 18C11.2 18 11.5 17.9 11.7 17.7Z" fill="currentColor" />\n' +
                                                '        <path d="M10.4343 15.4343L9.25 14.25C8.83579 13.8358 8.16421 13.8358 7.75 14.25C7.33579 14.6642 7.33579 15.3358 7.75 15.75L10.2929 18.2929C10.6834 18.6834 11.3166 18.6834 11.7071 18.2929L16.25 13.75C16.6642 13.3358 16.6642 12.6642 16.25 12.25C15.8358 11.8358 15.1642 11.8358 14.75 12.25L11.5657 15.4343C11.2533 15.7467 10.7467 15.7467 10.4343 15.4343Z" fill="currentColor" />\n' +
                                                '        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />\n' +
                                                '    </svg>' +
                                                '</span>';
                        }

                        if($('#nipPegawai').val() === row['nip_pegawai']){
                            buttonHapus =   '<a class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4" title="Hapus" onclick="hapusPertanyaan('+row['id_masalah']+',1)">\n' +
                                '      <span class="svg-icon svg-icon-3">\n' +
                                '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '                   <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />\n' +
                                '                   <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />\n' +
                                '                   <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />\n' +
                                '              </svg>\n' +
                                '      </span>\n' +
                                'Hapus</a>';

                            if(row['status'] === '0'){
                                buttonSolved =  '<a onclick="updateSolved('+row['id_masalah']+',1)" title="Solved" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                                                    '    <span class="svg-icon svg-icon-3">\n' +
                                                    '         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                                    '             <path opacity="0.3" d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z" fill="currentColor"></path> ' +
                                                    '             <path d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z" fill="currentColor"></path> ' +
                                                    '         </svg>\n' +
                                                    '    </span>\n' +
                                                    'Solved</a>';
                                buttonEdit = '<a data-toggle="modal" title="Edit" data-bs-toggle="modal"  data-bs-target="#modalEditPertanyaan" id="' + row['id_masalah'] + '" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4 btn-edit-pertanyaan">\n' +
                                                    '    <span class="svg-icon svg-icon-3">\n' +
                                                    '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                                    '            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                                                    '            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                                                    '        </svg>\n' +
                                                    '    </span>\n' +
                                                    'Edit</a>';
                            }
                        }

                        return '<div class="mb-5">\n' +
                            '                            <div class="d-flex mb-5 p-2">'+iconStatus+'\n' +
                            '                                <div class="d-flex flex-column">\n' +
                            '                                    <a onclick="goToJawaban('+row['id_masalah']+')" target="_blank" style="cursor: pointer;" class="text-dark text-hover-primary fs-4 me-3 fw-bold">'+row['permasalahan']+'</a>\n' +
                            '                                    <span class="text-gray-400 fw-bold">'+row['aplikasi']+' Ver- '+row['versioning']+'</span> ' +
                            '                                    <div class="">\n' +
                            '                                        <span class="fw-bold text-muted me-6">By:\n' +
                            '                                            <a href="#" class="text-muted text-hover-primary">'+row['nama_pegawai']+'</a></span>\n' +
                            '                                        <span class="fw-bold text-muted">Created:\n' +
                            '                                            <span class="fw-bolder text-gray-600 me-1"></span>'+moment(new Date(row['tgl_create'])).format("DD/MM/YYYY")+'</span>\n' +
                            '                                    </div>\n' +
                            '                                    <span class="fw-normal text-gray-800 fs-6" style="text-align: justify;">'+row['detail_permasalahan']+'</span>\n' +
                            '                                    <div class="d-flex align-items-center mb-5">\n' +
                            '                                        <a href="#" title="'+row['nama']+'" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                            '                                            <span class="svg-icon svg-icon-3">\n' +
                            '                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                                                    <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor" />\n' +
                            '                                                    <rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor" />\n' +
                            '                                                    <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor" />\n' +
                            '                                                </svg>\n' +
                            '                                            </span>'+row['jml']+'</a>\n' +
                            '                                        <a onclick="goToJawaban('+row['id_masalah']+')" title="Jawab" target="_blank" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                            '                                            <span class="svg-icon svg-icon-3">\n' +
                            '                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                            '                                                   <path d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z" fill="currentColor"></path> ' +
                            '                                                   <path d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z" fill="currentColor"></path> ' +
                            '                                                   <path opacity="0.3" d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z" fill="currentColor"></path> ' +
                            '                                                   <path opacity="0.3" d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z" fill="currentColor"></path> ' +
                            '                                                 </svg> ' +
                            '                                            </span>\n' +
                            '                                        Jawab</a>'+buttonEdit+' '+buttonSolved+' '+buttonHapus+' \n' +
                            '                                      </div>\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                        </div>';
                    }
                }
            ],
            "drawCallback": function( settings ) {
                $("#tabelTanyaJawab thead").remove();
            }
        });

        if ($('#cariTabelTanyaJawab').length > 0) {
            var filterSearch = document.querySelector('[data-tanyajawab="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelTanyaJawab.search(e.target.value).draw();
            });
        }

        var tabelPertanyaan = $('#tabelPertanyaan').DataTable({
            "ajax": {
                "url": "/service-diskusi/list-pertanyaan",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [],
            "processing": false,
            "bDestroy" : true,
            "bLengthChange" : false,
            "bInfo": false,
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
                    render: function (data, type, row) {
                        var iconStatus = '';
                        var buttonSolved = '';
                        var buttonEdit = '';
                        if(row['status'] === '0'){
                            iconStatus =        '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-warning">\n' +
                                                '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                                '       <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM16 13.5L12.5 13V10C12.5 9.4 12.6 9.5 12 9.5C11.4 9.5 11.5 9.4 11.5 10L11 13L8 13.5C7.4 13.5 7 13.4 7 14C7 14.6 7.4 14.5 8 14.5H11V18C11 18.6 11.4 19 12 19C12.6 19 12.5 18.6 12.5 18V14.5L16 14C16.6 14 17 14.6 17 14C17 13.4 16.6 13.5 16 13.5Z" fill="currentColor"></path> ' +
                                                '       <rect x="11" y="19" width="10" height="2" rx="1" transform="rotate(-90 11 19)" fill="currentColor"></rect> ' +
                                                '       <rect x="7" y="13" width="10" height="2" rx="1" fill="currentColor"></rect> ' +
                                                '       <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"></path> ' +
                                                '   </svg>' +
                                                '</span>';

                            buttonSolved =      '<a onclick="updateSolved('+row['id_masalah']+',1)" title="Solved" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                                                '    <span class="svg-icon svg-icon-3">\n' +
                                                '         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                                '             <path opacity="0.3" d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z" fill="currentColor"></path> ' +
                                                '             <path d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z" fill="currentColor"></path> ' +
                                                '         </svg>\n' +
                                                '    </span>\n' +
                                                '</a>';

                            buttonEdit =        '<a data-toggle="modal" title="Edit" data-bs-toggle="modal"  data-bs-target="#modalEditPertanyaan" id="' + row['id_masalah'] + '" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4 btn-edit-pertanyaan">\n' +
                                                '    <span class="svg-icon svg-icon-3">\n' +
                                                '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                                '            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                                                '            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                                                '        </svg>\n' +
                                                '    </span>\n' +
                                                '</a>';
                        } else {
                            iconStatus =        '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-success">\n' +
                                                '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                                '        <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM11.7 17.7L16 14C16.4 13.6 16.4 12.9 16 12.5C15.6 12.1 15.4 12.6 15 13L11 16L9 15C8.6 14.6 8.4 14.1 8 14.5C7.6 14.9 8.1 15.6 8.5 16L10.3 17.7C10.5 17.9 10.8 18 11 18C11.2 18 11.5 17.9 11.7 17.7Z" fill="currentColor" />\n' +
                                                '        <path d="M10.4343 15.4343L9.25 14.25C8.83579 13.8358 8.16421 13.8358 7.75 14.25C7.33579 14.6642 7.33579 15.3358 7.75 15.75L10.2929 18.2929C10.6834 18.6834 11.3166 18.6834 11.7071 18.2929L16.25 13.75C16.6642 13.3358 16.6642 12.6642 16.25 12.25C15.8358 11.8358 15.1642 11.8358 14.75 12.25L11.5657 15.4343C11.2533 15.7467 10.7467 15.7467 10.4343 15.4343Z" fill="currentColor" />\n' +
                                                '        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />\n' +
                                                '    </svg>' +
                                                '</span>';

                        }

                        var buttonHapus =   '<a class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4" title="Hapus" onclick="hapusPertanyaan('+row['id_masalah']+',1)">\n' +
                                            '      <span class="svg-icon svg-icon-3">\n' +
                                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                            '                   <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />\n' +
                                            '                   <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />\n' +
                                            '                   <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />\n' +
                                            '              </svg>\n' +
                                            '      </span>\n' +
                                            '</a>';

                        return '<div class="d-flex mb-0">'+iconStatus+'\n' +
                            '                            <div class="d-flex flex-column">\n' +
                            '                                <a onclick="goToJawaban('+row['id_masalah']+')" target="_blank" style="cursor: pointer;" class="text-gray-800 fw-bolder text-hover-primary">'+row['permasalahan']+'</a>\n' +
                            '                                <span class="text-gray-400 fw-bold">'+row['aplikasi']+' Ver- '+row['versioning']+'</span> ' +
                            '                            <div class="d-flex align-items-center mb-5">'+buttonEdit+' '+buttonSolved+' '+buttonHapus+' '+
                            '                               </div>'+
                            '                            </div>\n' +
                            '                        </div>';
                    }
                }
            ],
            "drawCallback": function( settings ) {
                $("#tabelPertanyaan thead").remove();
            }
        });

        if ($('#cariTabelPertanyaan').length > 0) {
            var filterSearch = document.querySelector('[data-pertanyaan="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelPertanyaan.search(e.target.value).draw();
            });
        }

        $(document).on("click", ".btn-edit-pertanyaan", function () {
            $.getJSON('/service-diskusi/get-detail-pertanyaan/' + $(this).attr('id'), function (jsondata) {
                $('#idPertanyaan').val(jsondata.id_masalah);
                $('#editAplikasiTanyaJawab').val(jsondata.id_aplikasi);
                $('#editVersionAplikasiTanyaJawab').val(jsondata.id_version);
                $('#editPertanyaan').val(jsondata.permasalahan);
                $('#editDetailPertanyaan').summernote('code',jsondata.detail_permasalahan);
                getSelectedEditVersionByAplikasi(parseInt(jsondata.id_aplikasi), jsondata.id_version, jsondata.keterangan);
            });
        });

        $("#formTambahPertanyaan").validate({
            rules: {
                inputAplikasiTanyaJawab: {required: true},
                inputVersionAplikasiTanyaJawab: {required: true},
                inputPertanyaan: {required: true},
            },
            submitHandler: function () {
                $('#modalTambahPertanyaan').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-diskusi/simpan-pertanyaan",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputAplikasiTanyaJawab: $('#inputAplikasiTanyaJawab').val(),
                        inputVersionAplikasiTanyaJawab: $('#inputVersionAplikasiTanyaJawab').val(),
                        inputPertanyaan: $('#inputPertanyaan').val(),
                        inputDetailPertanyaan: $('#inputDetailPertanyaan').val(),
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelTanyaJawab').DataTable().ajax.reload(null, false);
                                $('#tabelPertanyaan').DataTable().ajax.reload(null, false);
                                $('#formTambahPertanyaan')[0].reset();
                                $('#inputDetailPertanyaan').summernote('code','');
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

        $("#formEditPertanyaan").validate({
            rules: {
                idPertanyaan: {required: true},
                editAplikasiTanyaJawab: {required: true},
                editVersionAplikasiTanyaJawab: {required: true},
                editPertanyaan: {required: true},
            },
            submitHandler: function () {
                $('#modalEditPertanyaan').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-diskusi/edit-pertanyaan",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idPertanyaan: $('#idPertanyaan').val(),
                        editAplikasiTanyaJawab: $('#editAplikasiTanyaJawab').val(),
                        editVersionAplikasiTanyaJawab: $('#editVersionAplikasiTanyaJawab').val(),
                        editPertanyaan: $('#editPertanyaan').val(),
                        editDetailPertanyaan: $('#editDetailPertanyaan').val(),
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                location.reload();
                                $('#formEditPertanyaan')[0].reset();
                                $('#editDetailPertanyaan').summernote('code','');
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

    var handleJawaban = function () {
        var tabelJawaban = $('#tabelJawaban').DataTable({
            "ajax": {
                "url": "/service-diskusi/list-jawaban/"+$('#idMasalah').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [],
            "processing": false,
            "bDestroy" : true,
            "bLengthChange" : false,
            "bInfo": false,
            "oLanguage": {
                "sLengthMenu": "Tampilkan _MENU_ data",
                "sZeroRecords": "Tidak ada Jawaban",
                "sInfo": "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                "sInfoEmpty": "Menampilkan 0 sampai 0 dari 0 data",
                "sLoadingRecords": "Sedang memuat...",
                "sProcessing": "Sedang memproses...",
                "sSearch": "Cari:"
            },
            "columns": [
                {"data": "null",
                    render: function (data, type, row) {
                        var iconStatus = '';
                        var buttonEdit = '';
                        var buttonSolved = '';
                        var buttonHapus = '';
                        if(row['status'] === '0'){
                            iconStatus =    '<div class="mb-5">';
                        } else {
                            iconStatus =    '<div class="overflow-hidden position-relative card-rounded mb-5">\n' +
                                                '    <div class="ribbon ribbon-triangle ribbon-top-start border-success">\n' +
                                                '       <div class="ribbon-icon mt-n5 ms-n6">\n' +
                                                '            <i class="bi bi-check2 fs-2 text-white"></i>\n' +
                                                '       </div>\n' +
                                                '    </div>';
                        }
                        var nama = row['nama_pegawai'];

                        if($('#nipPegawai').val() === row['nip_pegawai']){
                            if(row['status'] === '0'){
                                buttonEdit =    '<a data-toggle="modal" title="Edit" data-bs-toggle="modal"  data-bs-target="#modalEditJawaban" id="' + row['id_solusi'] + '" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4 btn-edit-jawaban">\n' +
                                                '    <span class="svg-icon svg-icon-3">\n' +
                                                '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                                '            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                                                '            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                                                '        </svg>\n' +
                                                '    </span>\n' +
                                                'Edit</a>';

                                buttonHapus =   '<a class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4" title="Hapus" onclick="hapusJawaban('+row['id_solusi']+')">\n' +
                                                '      <span class="svg-icon svg-icon-3">\n' +
                                                '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                                '                   <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />\n' +
                                                '                   <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />\n' +
                                                '                   <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />\n' +
                                                '              </svg>\n' +
                                                '      </span>\n' +
                                                'Hapus</a>';
                            }
                        }

                        if($('#nipPertanyaan').val() === $('#nipPegawai').val()){
                            if(row['status'] === '0'){
                                buttonSolved =      '<a onclick="updateSolvedJawaban('+row['id_solusi']+')" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                                                    '    <span class="svg-icon svg-icon-3">\n' +
                                                    '         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                                    '             <path opacity="0.3" d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z" fill="currentColor"></path> ' +
                                                    '             <path d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z" fill="currentColor"></path> ' +
                                                    '         </svg>\n' +
                                                    '    </span>\n' +
                                                    'Solved</a>';
                            }
                        }

                        return ''+iconStatus+'<div class="card card-bordered w-100">\n' +
                            '       <div class="card-body">\n' +
                            '            <div class="w-100 d-flex flex-stack mb-5">\n' +
                            '                <div class="d-flex align-items-center f">\n' +
                            '                    <div class="symbol symbol-50px me-5"> ' +
                            '                         <div class="symbol-label fs-1 fw-bolder bg-light-primary text-primary">'+nama.charAt(0)+'</div> ' +
                            '                    </div> '+
                            '                    <div class="d-flex flex-column fw-bold fs-5 text-gray-600 text-dark">\n' +
                            '                         <div class="d-flex align-items-center">\n' +
                            '                              <a href="#" class="text-gray-800 fw-bolder text-hover-primary fs-5 me-3">'+row['nama_pegawai']+'</a>\n' +
                            '                              <span class="m-0"></span>\n' +
                            '                         </div>\n' +
                            '                         <span class="text-muted fw-bold fs-6">'+moment(new Date(row['wkt_tambah'])).format("DD/MM/YYYY")+'</span>\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <p class="fw-normal fs-5 text-gray-700 m-0">'+row['solusi']+'</p>\n' +
                            '            <div class="d-flex align-items-center">'+buttonEdit+' '+buttonSolved+' '+buttonHapus+' ' +
                            '            </div>' +
                            '      </div>' +
                            '</div>';
                    }
                }
            ],
            "drawCallback": function( settings ) {
                $("#tabelJawaban thead").remove();
            }
        });

        $(document).on("click", ".btn-edit-jawaban", function () {
            $.getJSON('/service-diskusi/get-detail-jawaban/' + $(this).attr('id'), function (jsondata) {
                $('#idJawaban').val(jsondata.id_solusi);
                $('#editJawaban').summernote('code',jsondata.solusi);
            });
        });

        $("#formJawaban").validate({
            rules: {
                inputJawaban: {required: true},
            },
            submitHandler: function () {
                $('#modalTambahPertanyaan').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-diskusi/simpan-jawaban",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        inputJawaban: $('#inputJawaban').val(),
                        idMasalah: $('#idMasalah').val(),
                    },
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

        $("#formEditJawaban").validate({
            rules: {
                idJawaban: {required: true},
                editJawaban: {required: true},
            },
            submitHandler: function () {
                $('#modalEditJawaban').modal('hide');
                showLoading();
                $.ajax({
                    url: "/service-diskusi/edit-jawaban",
                    type: "post",
                    headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    data: {
                        idJawaban: $('#idJawaban').val(),
                        editJawaban: $('#editJawaban').val(),
                    },
                    success: function (data) {
                        if (data === "1") {
                            swal.fire({
                                title: "SUKSES",
                                text: "Data Berhasil Ditambah",
                                icon: "success"
                            }).then(function () {
                                $('#tabelJawaban').DataTable().ajax.reload(null, false);
                                $('#formEditJawaban')[0].reset();
                                $('#editJawaban').summernote('code','');
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

    var handleMonitoringTanyaJawab = function () {
        var tabelTanyaJawabAplikasi = $('#tabelTanyaJawabAplikasi').DataTable({
            "ajax": {
                "url": "/service-diskusi/list-tanya-jawab-aplikasi",
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                "method": "post",
                "data": function (d) {
                    d.v1 = $('#cariPertanyaanAplikasiByStatus').val();
                    d.v2 = $('#idVersion').val();
                }
            },
            "sAjaxDataProp": "",
            "order": [],
            "processing": false,
            "bDestroy" : true,
            "bLengthChange" : false,
            "bInfo": false,
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
                    render: function (data, type, row) {
                        var iconStatus = '';
                        var buttonSolved = '';
                        var buttonEdit = '';
                        var buttonHapus = '';
                        if(row['status'] === '0'){
                            iconStatus =    '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-warning">\n' +
                                '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                '       <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM16 13.5L12.5 13V10C12.5 9.4 12.6 9.5 12 9.5C11.4 9.5 11.5 9.4 11.5 10L11 13L8 13.5C7.4 13.5 7 13.4 7 14C7 14.6 7.4 14.5 8 14.5H11V18C11 18.6 11.4 19 12 19C12.6 19 12.5 18.6 12.5 18V14.5L16 14C16.6 14 17 14.6 17 14C17 13.4 16.6 13.5 16 13.5Z" fill="currentColor"></path> ' +
                                '       <rect x="11" y="19" width="10" height="2" rx="1" transform="rotate(-90 11 19)" fill="currentColor"></rect> ' +
                                '       <rect x="7" y="13" width="10" height="2" rx="1" fill="currentColor"></rect> ' +
                                '       <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"></path> ' +
                                '   </svg>' +
                                '</span>';

                        } else {
                            iconStatus =    '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-success">\n' +
                                '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '        <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM11.7 17.7L16 14C16.4 13.6 16.4 12.9 16 12.5C15.6 12.1 15.4 12.6 15 13L11 16L9 15C8.6 14.6 8.4 14.1 8 14.5C7.6 14.9 8.1 15.6 8.5 16L10.3 17.7C10.5 17.9 10.8 18 11 18C11.2 18 11.5 17.9 11.7 17.7Z" fill="currentColor" />\n' +
                                '        <path d="M10.4343 15.4343L9.25 14.25C8.83579 13.8358 8.16421 13.8358 7.75 14.25C7.33579 14.6642 7.33579 15.3358 7.75 15.75L10.2929 18.2929C10.6834 18.6834 11.3166 18.6834 11.7071 18.2929L16.25 13.75C16.6642 13.3358 16.6642 12.6642 16.25 12.25C15.8358 11.8358 15.1642 11.8358 14.75 12.25L11.5657 15.4343C11.2533 15.7467 10.7467 15.7467 10.4343 15.4343Z" fill="currentColor" />\n' +
                                '        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />\n' +
                                '    </svg>' +
                                '</span>';
                        }

                        if($('#nipPegawai').val() === row['nip_pegawai']){
                            buttonHapus =   '<a class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4" title="Hapus" onclick="hapusPertanyaan('+row['id_masalah']+',1)">\n' +
                                '      <span class="svg-icon svg-icon-3">\n' +
                                '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '                   <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />\n' +
                                '                   <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />\n' +
                                '                   <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />\n' +
                                '              </svg>\n' +
                                '      </span>\n' +
                                'Hapus</a>';

                            if(row['status'] === '0'){
                                buttonSolved =  '<a onclick="updateSolved('+row['id_masalah']+',1)" title="Solved" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                                    '    <span class="svg-icon svg-icon-3">\n' +
                                    '         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                    '             <path opacity="0.3" d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z" fill="currentColor"></path> ' +
                                    '             <path d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z" fill="currentColor"></path> ' +
                                    '         </svg>\n' +
                                    '    </span>\n' +
                                    'Solved</a>';
                                buttonEdit = '<a data-toggle="modal" title="Edit" data-bs-toggle="modal"  data-bs-target="#modalEditPertanyaan" id="' + row['id_masalah'] + '" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4 btn-edit-pertanyaan">\n' +
                                    '    <span class="svg-icon svg-icon-3">\n' +
                                    '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                    '            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                                    '            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                                    '        </svg>\n' +
                                    '    </span>\n' +
                                    'Edit</a>';
                            }
                        }

                        return '<div class="mb-5">\n' +
                            '                            <div class="d-flex mb-5 p-2">'+iconStatus+'\n' +
                            '                                <div class="d-flex flex-column">\n' +
                            '                                    <a onclick="goToJawaban('+row['id_masalah']+')" target="_blank" style="cursor: pointer;" class="text-dark text-hover-primary fs-4 me-3 fw-bold">'+row['permasalahan']+'</a>\n' +
                            '                                    <span class="text-gray-400 fw-bold">'+row['aplikasi']+' Ver- '+row['versioning']+'</span> ' +
                            '                                    <div class="">\n' +
                            '                                        <span class="fw-bold text-muted me-6">By:\n' +
                            '                                            <a href="#" class="text-muted text-hover-primary">'+row['nama_pegawai']+'</a></span>\n' +
                            '                                        <span class="fw-bold text-muted">Created:\n' +
                            '                                            <span class="fw-bolder text-gray-600 me-1"></span>'+moment(new Date(row['tgl_create'])).format("DD/MM/YYYY")+'</span>\n' +
                            '                                    </div>\n' +
                            '                                    <span class="fw-normal text-gray-800 fs-6" style="text-align: justify;">'+row['detail_permasalahan']+'</span>\n' +
                            '                                    <div class="d-flex align-items-center mb-5">\n' +
                            '                                        <a href="#" title="'+row['nama']+'" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                            '                                            <span class="svg-icon svg-icon-3">\n' +
                            '                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                                                    <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor" />\n' +
                            '                                                    <rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor" />\n' +
                            '                                                    <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor" />\n' +
                            '                                                </svg>\n' +
                            '                                            </span>'+row['jml']+'</a>\n' +
                            '                                        <a onclick="goToJawaban('+row['id_masalah']+')" title="Jawab" target="_blank" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                            '                                            <span class="svg-icon svg-icon-3">\n' +
                            '                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                            '                                                   <path d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z" fill="currentColor"></path> ' +
                            '                                                   <path d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z" fill="currentColor"></path> ' +
                            '                                                   <path opacity="0.3" d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z" fill="currentColor"></path> ' +
                            '                                                   <path opacity="0.3" d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z" fill="currentColor"></path> ' +
                            '                                                 </svg> ' +
                            '                                            </span>\n' +
                            '                                        Jawab</a>'+buttonEdit+' '+buttonSolved+' '+buttonHapus+' \n' +
                            '                                      </div>\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                        </div>';
                    }
                }
            ],
            "drawCallback": function( settings ) {
                $("#tabelTanyaJawab thead").remove();
            }
        });

        if ($('#cariTabelTanyaJawabAplikasi').length > 0) {
            var filterSearch = document.querySelector('[data-tanyajawab-aplikasi="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelTanyaJawabAplikasi.search(e.target.value).draw();
            });
        }

        var tabelPertanyaanAplikasi = $('#tabelPertanyaanAplikasi').DataTable({
            "ajax": {
                "url": "/service-diskusi/list-pertanyaan-aplikasi/"+$('#idVersion').val(),
                "headers": {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")}
            },
            "sAjaxDataProp": "",
            "order": [],
            "processing": false,
            "bDestroy" : true,
            "bLengthChange" : false,
            "bInfo": false,
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
                    render: function (data, type, row) {
                        var iconStatus = '';
                        var buttonSolved = '';
                        var buttonEdit = '';
                        if(row['status'] === '0'){
                            iconStatus =        '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-warning">\n' +
                                '   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                '       <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM16 13.5L12.5 13V10C12.5 9.4 12.6 9.5 12 9.5C11.4 9.5 11.5 9.4 11.5 10L11 13L8 13.5C7.4 13.5 7 13.4 7 14C7 14.6 7.4 14.5 8 14.5H11V18C11 18.6 11.4 19 12 19C12.6 19 12.5 18.6 12.5 18V14.5L16 14C16.6 14 17 14.6 17 14C17 13.4 16.6 13.5 16 13.5Z" fill="currentColor"></path> ' +
                                '       <rect x="11" y="19" width="10" height="2" rx="1" transform="rotate(-90 11 19)" fill="currentColor"></rect> ' +
                                '       <rect x="7" y="13" width="10" height="2" rx="1" fill="currentColor"></rect> ' +
                                '       <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"></path> ' +
                                '   </svg>' +
                                '</span>';

                            buttonSolved =      '<a onclick="updateSolved('+row['id_masalah']+',1)" title="Solved" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4">\n' +
                                '    <span class="svg-icon svg-icon-3">\n' +
                                '         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> ' +
                                '             <path opacity="0.3" d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z" fill="currentColor"></path> ' +
                                '             <path d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z" fill="currentColor"></path> ' +
                                '         </svg>\n' +
                                '    </span>\n' +
                                '</a>';

                            buttonEdit =        '<a data-toggle="modal" title="Edit" data-bs-toggle="modal"  data-bs-target="#modalEditPertanyaan" id="' + row['id_masalah'] + '" class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4 btn-edit-pertanyaan">\n' +
                                '    <span class="svg-icon svg-icon-3">\n' +
                                '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '            <path d="M17.5 11H6.5C4 11 2 9 2 6.5C2 4 4 2 6.5 2H17.5C20 2 22 4 22 6.5C22 9 20 11 17.5 11ZM15 6.5C15 7.9 16.1 9 17.5 9C18.9 9 20 7.9 20 6.5C20 5.1 18.9 4 17.5 4C16.1 4 15 5.1 15 6.5Z" fill="currentColor"></path>\n' +
                                '            <path opacity="0.3" d="M17.5 22H6.5C4 22 2 20 2 17.5C2 15 4 13 6.5 13H17.5C20 13 22 15 22 17.5C22 20 20 22 17.5 22ZM4 17.5C4 18.9 5.1 20 6.5 20C7.9 20 9 18.9 9 17.5C9 16.1 7.9 15 6.5 15C5.1 15 4 16.1 4 17.5Z" fill="currentColor"></path>\n' +
                                '        </svg>\n' +
                                '    </span>\n' +
                                '</a>';
                        } else {
                            iconStatus =        '<span class="svg-icon svg-icon-2x me-5 ms-n1 mt-2 svg-icon-success">\n' +
                                '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                                '        <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM11.7 17.7L16 14C16.4 13.6 16.4 12.9 16 12.5C15.6 12.1 15.4 12.6 15 13L11 16L9 15C8.6 14.6 8.4 14.1 8 14.5C7.6 14.9 8.1 15.6 8.5 16L10.3 17.7C10.5 17.9 10.8 18 11 18C11.2 18 11.5 17.9 11.7 17.7Z" fill="currentColor" />\n' +
                                '        <path d="M10.4343 15.4343L9.25 14.25C8.83579 13.8358 8.16421 13.8358 7.75 14.25C7.33579 14.6642 7.33579 15.3358 7.75 15.75L10.2929 18.2929C10.6834 18.6834 11.3166 18.6834 11.7071 18.2929L16.25 13.75C16.6642 13.3358 16.6642 12.6642 16.25 12.25C15.8358 11.8358 15.1642 11.8358 14.75 12.25L11.5657 15.4343C11.2533 15.7467 10.7467 15.7467 10.4343 15.4343Z" fill="currentColor" />\n' +
                                '        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor" />\n' +
                                '    </svg>' +
                                '</span>';

                        }

                        var buttonHapus =   '<a class="btn btn-sm btn-light btn-color-muted btn-active-light-primary px-4 py-2 me-4" title="Hapus" onclick="hapusPertanyaan('+row['id_masalah']+',1)">\n' +
                            '      <span class="svg-icon svg-icon-3">\n' +
                            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                            '                   <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />\n' +
                            '                   <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />\n' +
                            '                   <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />\n' +
                            '              </svg>\n' +
                            '      </span>\n' +
                            '</a>';

                        return '<div class="d-flex mb-0">'+iconStatus+'\n' +
                            '                            <div class="d-flex flex-column">\n' +
                            '                                <a onclick="goToJawaban('+row['id_masalah']+')" target="_blank" style="cursor: pointer;" class="text-gray-800 fw-bolder text-hover-primary">'+row['permasalahan']+'</a>\n' +
                            '                                <span class="text-gray-400 fw-bold">'+row['aplikasi']+' Ver- '+row['versioning']+'</span> ' +
                            '                            <div class="d-flex align-items-center mb-5">'+buttonEdit+' '+buttonSolved+' '+buttonHapus+' '+
                            '                               </div>'+
                            '                            </div>\n' +
                            '                        </div>';
                    }
                }
            ],
            "drawCallback": function( settings ) {
                $("#tabelPertanyaan thead").remove();
            }
        });

        if ($('#cariTabelPertanyaanAplikasi').length > 0) {
            var filterSearch = document.querySelector('[data-pertanyaan-aplikasi="search"]');
            filterSearch.addEventListener('keyup', function (e) {
                tabelPertanyaanAplikasi.search(e.target.value).draw();
            });
        }
    };

    return {
        init: function () {
            dashboardDiskusi();
            handlePertanyaan();
            handleJawaban();
            handleMonitoringTanyaJawab();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardDiskusi.init();
});