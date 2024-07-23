"use strict";
// Class definition

var KTDatatableDashboardGlobal = function () {

    var dashboardGlobal = function () {
        $(".fomatversion").mask("9.9.9");

        checkJumlahBelumTerjawab();

        var firstPath = window.location.pathname.split("/")[1];
        var secondPath = window.location.pathname.split("/")[2];
        var threePath = window.location.pathname.split("/")[3];
        if (firstPath === "dashboard") {
            $('#dashboardMenu').addClass("active");
        } else if(secondPath === "bagian"){
            $('#manajemenDataMenu').addClass("active");
            $('#listManajemenDataMenu').addClass("kt-menu__item--open kt-menu__item--here show");
            if(threePath === "subdit"){
                $('#manajemenSubditSubMenu').addClass("active");
            } else if(threePath === 'seksi'){
                $('#manajemenSeksiSubMenu').addClass("active");
            } else if(threePath === 'stakeholder'){
                $('#manajemenStakeholderSubMenu').addClass("active");
            }
        } else if(secondPath === "proyek"){
            $('#manajemenProyekMenu').addClass("active");
            $('#listManajemenProyekMenu').addClass("kt-menu__item--open kt-menu__item--here show");
            if(threePath === "bagian-tim"){
                $('#manajemenBagianTimSubMenu').addClass("active");
            } else if(threePath === 'jenis-dokumen'){
                $('#manajemenJenisDokumenSubMenu').addClass("active");
            } else if(threePath === 'kategori'){
                $('#manajemenKategoriSubMenu').addClass("active");
            } else if(threePath === 'jenis-surat'){
                $('#manajemenJenisSuratSubMenu').addClass("active");
            } else if(threePath === 'jatuh-tempo'){
                $('#manajemenJatuhTempoSubMenu').addClass("active");
            }
        } else if(firstPath === "monitoring"){
            $('#monitoringAplikasiMenu').addClass("active");
        } else if(firstPath === "pengembangan"){
            $('#listAplikasiMenu').addClass("active");
        } else if(secondPath === "surat"){
            $('#manajemenPersuratanMenu').addClass("active");
        } else if(firstPath === "diskusi"){
            $('#diskusiMenu').addClass("active");
        } else if(secondPath === "renker"){
            $('#manajemenRenker').addClass("active");
        }

        $('.numbers').keyup(function () {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    };

    return {
        init: function () {
            dashboardGlobal();
        }
    };

}();

jQuery(document).ready(function () {
    KTDatatableDashboardGlobal.init();
});