// Class definition

var KTBootstrapTimepicker = function () {
    
    // Private functions
    var demos = function () {
        // minimum setup

        $('#waktu_mulai, #waktu_selesai, #edit_waktu_mulai, #edit_waktu_selesai').timepicker({
            showMeridian: false,
            format: 'hh:mm',
        });

        $('#inputWaktuPelaksanaan, #kt_timepicker_3_modal, #wkt_pelaksanaan, #inputWaktuPelaksanaan, #waktuLaporanMonitoring ').timepicker({
            defaultTime: '00:00:00 AM',
            minuteStep: 1,
            showSeconds: true,
            showMeridian: true
        });

        $('#inputWaktuPelaksanaan, #waktuLaporanMonitoring, #kt_timepicker_3_modal, #wkt_pelaksanaan, #waktuLaporanEvaluasi').timepicker({
            defaultTime: '00:00:00 AM',
            minuteStep: 1,
            showSeconds: true,
            showMeridian: true
        });

        $('#kt_timepicker_1, #kt_timepicker_1_modal').timepicker();

        // minimum setup
        $('#kt_timepicker_2, #kt_timepicker_2_modal').timepicker({
            minuteStep: 1,
            defaultTime: '',
            showSeconds: true,
            showMeridian: false,
            snapToStep: true
        });

        // default time
        $('#kt_timepicker_3, #kt_timepicker_3_modal').timepicker({
            defaultTime: '11:45:20 AM',
            minuteStep: 1,
            showSeconds: true,
            showMeridian: true
        });

        // default time
        $('#kt_timepicker_4, #kt_timepicker_4_modal').timepicker({
            defaultTime: '10:30:20 AM',           
            minuteStep: 1,
            showSeconds: true,
            showMeridian: true
        });

        // validation state demos
        // minimum setup
        $('#kt_timepicker_1_validate, #kt_timepicker_2_validate, #kt_timepicker_3_validate').timepicker({
            minuteStep: 1,
            showSeconds: true,
            showMeridian: false,
            snapToStep: true
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
    KTBootstrapTimepicker.init();
});