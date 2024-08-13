"use strict";
var manajemen = function () {

    $('#btnAddKriteria').on('click', function () {
        $('#addKriteriaModal').modal('show');
    });


    $('#btnSimpanKriteria').on('click', function () {

        var idPegawai = $('#inputNamaDeveloper').val();
        var skillLevel = $('#inputSkillProgramming').val();
        var stack = $('#inputStack').val();
        var pelatihan = $('#inputPelatihan').val();


        var count1 = $.grep(stack, function (value) {
            return value === '1';
        }).length;

        var count2 = $.grep(stack, function (value) {
            return value === '2';
        }).length;

        var count3 = $.grep(stack, function (value) {
            return value === '3';
        }).length;


        //C4
        if(pelatihan.length <= 1){
            console.log("bobot 1")
        }else if(pelatihan.length > 1 && pelatihan.length <= 3){
            console.log("bobot 2")
        }else if(pelatihan.length > 3 && pelatihan.length <= 5){
            console.log("bobot 3")
        }else if(pelatihan.length > 5 && pelatihan.length <= 7){
            console.log("bobot 4")
        }else if(pelatihan.length > 7){
            console.log("bobot 5")
        }else {
            alert("Bobot tidak tersedia")
        }




        //C5
        if (count1 == 1 && count2 == 0 && count3 == 0) {
            console.log("bobot 1")
        } else if (count1 >= 2 && count2 == 0 && count3 == 0) {
            console.log("bobot 2")
        } else if (count1 >= 1 && count2 >= 1 && count3 == 0) {
            console.log("bobot 3")
        } else if (count1 >= 1 && count2 >= 1 && count3 == 1) {
            console.log("bobot 4")
        } else if (count1 >= 1 && count2 >= 1 && count3 >= 1) {
            console.log("bobot 5")
        }else if(count1>=1 && count2==0 && count3>=1){
            alert("Jika memilih (selain programming dan database) dan programming,maka harus memilih database juga")
        } else {
            alert("Wajib memilih minimal 1 stack programming atau pilihan stack tidak sesuai")
        }




    });


    return {
        init: function () {

        },
    };
}();

jQuery(document).ready(function () {
    manajemen.init();
});