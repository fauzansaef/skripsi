// Class definition

var KTBootstrapDatepicker = function () {

    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    
    // Private functions
    var demos = function () {

        // input group layout
        $('#tanggalAwal').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd'
        });

        $('#tanggalAkhir').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            minDate: new Date($('#tanggalAwal').val()),
            setDate: new Date(),
            format: 'yyyy-mm-dd'
        });

        $('#tanggalSP').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd'
        });

        function getBatasPengisian() {
            var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
            var date = "";
            $.ajax({
                url: "/service/kegiatan/getBatasPengisian",
                type: "post",
                async: false,
                headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                data: {_token: CSRF_TOKEN},
                dataType: 'json',
                success: function (data) {
                    date = data;
                }
            });

            return date;
        }

        $('#inputTanggalPelaksanaan, #tgl_pelaksanaan').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            format: 'yyyy-mm-dd',
            startDate: '-'+getBatasPengisian()+'d',
            // endDate: new Date(),
            // datesDisabled: '-15d',
            keyboardNavigation: false,
            forceParse: false,
        });

        $('#tanggalKoordinasi, #tanggalLaporan, #tanggal_laporan, #tanggalKoordinasiEksternal, #tanggalKoordinasiInternal').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });

        $('#tanggalBA').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        }).on("changeDate", function () {
            var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu' ];
            var date = new Date($('#tanggalBA').datepicker('getDate'));
            $('#hari_ba').val(days[date.getDay()]);
        });

        $('#tanggalLaporanImplementasiInklusi, #tanggalPengesahanLaporanImplementasi, #tanggalPengesahanLaporanImplementasi, #tanggalLaporanMonitoringInklusi, #tanggalLaporanMonitoring, #tanggalLaporanEvaluasiInklusi, #tanggalLaporanEvaluasi').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });

        // input group layout for modal demo
        $('#input_tanggal_sk, #inputExpiredDate').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });

        $('#edit_tanggal_sk').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });

        $('#tanggalNd, #tanggalST').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });

        $('#inputTanggalSuratTugas, #inputTanggalMulaiPenyusunanMateri, #inputTanggalPeninjauan, #updateTanggalPeninjauan, #tanggalSuratPerintah, #inputTanggalMulaiPenyusunan, #tanggal_surat_tugas, #tanggal_mulai_penyusunan_materi').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });

        $('#inputTanggalMulaiPenyusunanMateri').datepicker().on("changeDate", function () {
            $("#inputTanggalTargetMateriDisetujui").datepicker("setStartDate", new Date($('#inputTanggalMulaiPenyusunanMateri').val()));
        });

        $('#tanggal_mulai_penyusunan_materi').datepicker().on("changeDate", function () {
            $("#tanggal_target_materi_disetujui").datepicker("setStartDate", new Date($('#tanggal_mulai_penyusunan_materi').val()));
        });

        $('#inputTanggalMulaiPenyusunan').datepicker().on("changeDate", function () {
            $("#inputTanggalSelesaiPenyusunan").datepicker("setStartDate", new Date($('#inputTanggalMulaiPenyusunan').val()));
        });

        $('#inputTanggalTargetMateriDisetujui, #tanggal_target_materi_disetujui, #inputTanggalSelesaiPenyusunan').datepicker({
            rtl: KTUtil.isRTL(),
            autoclose: true,
            dateFormat: 'yyyy-mm-dd',
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows,
            setDate: new Date(),
            format: 'yyyy-mm-dd',
        });
        
        // minimum setup
        $('#kt_datepicker_1, #kt_datepicker_1_validate').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // minimum setup for modal demo
        $('#kt_datepicker_1_modal').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // input group layout 
        $('#kt_datepicker_2, #kt_datepicker_2_validate').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // input group layout for modal demo
        $('#kt_datepicker_2_modal').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });
        

        // enable clear button 
        $('#kt_datepicker_3, #kt_datepicker_3_validate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            todayHighlight: true,
            templates: arrows
        });

        // enable clear button for modal demo
        $('#kt_datepicker_3_modal').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            todayHighlight: true,
            templates: arrows
        });

        // orientation 
        $('#kt_datepicker_4_1').datepicker({
            rtl: KTUtil.isRTL(),
            orientation: "top left",
            todayHighlight: true,
            templates: arrows
        });

        $('#kt_datepicker_4_2').datepicker({
            rtl: KTUtil.isRTL(),
            orientation: "top right",
            todayHighlight: true,
            templates: arrows
        });

        $('#kt_datepicker_4_3').datepicker({
            rtl: KTUtil.isRTL(),
            orientation: "bottom left",
            todayHighlight: true,
            templates: arrows
        });

        $('#kt_datepicker_4_4').datepicker({
            rtl: KTUtil.isRTL(),
            orientation: "bottom right",
            todayHighlight: true,
            templates: arrows
        });

        // range picker
        $('#kt_datepicker_5').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            templates: arrows
        });

         // inline picker
        $('#kt_datepicker_6').datepicker({
            rtl: KTUtil.isRTL(),
            todayHighlight: true,
            templates: arrows
        });
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapDatepicker.init();
});