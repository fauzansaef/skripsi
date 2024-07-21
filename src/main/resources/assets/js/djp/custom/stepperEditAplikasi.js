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
                inputKeteranganVersion: {required: true},
                inputSubditPengampuAplikasi: {required: true},
                inputSeksiPengampuAplikasi: {required: true},
                inputStakeholderAplikasi: {required: true},
                inputKategoriAplikasi: {required: true},
                inputDeadline: {required: true}
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
            window.location.href = window.location.origin + "/monitoring/aplikasi/detail/"+$('#idVersion').val();
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
        var array = [];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }


        $.ajax({
            url: "/service-monitoring/aplikasi/edit-aplikasi-by-stepper",
            type: "post",
            headers:  {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            data: {
                idAplikasi: $('#idAplikasi').val(),
                idVersion: $('#idVersion').val(),
                inputKodeProyek: $('#inputKodeProyek').val(),
                inputStatusProject: $('#inputStatusProject').val(),
                inputKeteranganVersion: $('#inputKeteranganVersion').val(),
                inputSubditPengampuAplikasi: $('#inputSubditPengampuAplikasi').val(),
                inputSeksiPengampuAplikasi: $('#inputSeksiPengampuAplikasi').val(),
                inputStakeholderAplikasi: $('#inputStakeholderAplikasi').val(),
                inputKategoriAplikasi: $('#inputKategoriAplikasi').val(),
                inputSourcecodeAplikasi: $('#inputSourcecodeAplikasi').val(),
                inputTanggalMulaiVersioning: $('#inputTanggalMulaiVersioning').val(),
                inputTanggalAkhirVersioning: $('#inputTanggalAkhirVersioning').val(),
                inputBahasaPemrograman: $('#inputBahasaPemrograman').val(),
                inputInfrastruktur: $('#inputInfrastruktur').val(),
                inputDatabase: $('#inputDatabase').val(),
                inputKeterkaitanAplikasi: $('#inputKeterkaitanAplikasi').val(),
                inputModulFungsi: $('#inputModulFungsi').val(),
                inputDeadline: $('#inputDeadline').val(),
                inputTanggalAwalPerencanaan: $('#inputTanggalAwalPerencanaan').val(),
                inputTanggalAkhirPerencanaan: $('#inputTanggalAkhirPerencanaan').val(),
                inputTanggalAwalPengujian: $('#inputTanggalAwalPengujian').val(),
                inputTanggalAkhirPengujian: $('#inputTanggalAkhirPengujian').val(),
                arrayBisnisOwner: JSON.stringify(array)
            },
            success: function (data) {
                if (data === "1") {
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