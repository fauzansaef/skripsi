$('.digit-group').find('input').each(function() {
    $(this).on('keyup', function(e) {
        var parent = $($(this).parent());
        if(e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));
            if(prev.length) {
                $(prev).select();
            }
        } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
            var next = parent.find('input#' + $(this).data('next'));
            if($(this).val() !== "") {
                if (next.length) {
                    $(next).select();
                } else {
                    if (parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        }
    });
});

$(document).on("input", "input[name^=digit]", function(e) {
    var text = $(this).val();
    if (text.length == 6) {
        for (i=1 ; i<=text.length ; i++) {
            $("input[name^=digit]").eq(i-1).val(text[i-1]);
        }
    }
    else if (text.length > 1) {
        $(this).val(text[0]);
    }
});

function changeLabelName(selectObject) {
    var value = selectObject.value.replace('C:\\fakepath\\','');
    var data = document.querySelector('[name="'+selectObject.name+'"]');
    var label = data.closest('.input-group').children.item(1);
    label.value = value;
}

function bulanIndo(cek) {
    var bulan;
    switch (cek) {
        case "01":
            bulan = "Januari";
            break;
        case "02":
            bulan = "Februari";
            break;
        case "03":
            bulan = "Maret";
            break;
        case "04":
            bulan = "April";
            break;
        case "05":
            bulan = "Mei";
            break;
        case "06":
            bulan = "Juni";
            break;
        case "07":
            bulan = "Juli";
            break;
        case "08":
            bulan = "Agustus";
            break;
        case "09":
            bulan = "September";
            break;
        case "10":
            bulan = "Oktober";
            break;
        case "11":
            bulan = "November";
            break;
        case "12":
            bulan = "Desember";
            break;
    }
    return bulan;
}

function formatRibuan(angka){
    var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

function formatRupiah(angka){
    if((angka === angka) && angka != null && angka !== "null") {
        var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return 'Rp. ' + ribuan;
    }else{
        return 'Rp. 0';
    }
}

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

function errorResult() {
    swal.fire({
        title: "ERROR",
        text: "Data Gagal Diproses",
        icon: "error",
        customClass: {
            confirmButton: "btn btn-danger"
        }
    })
}

function checkJumlahBelumTerjawab() {
    var token = $("meta[name='_csrf']").attr("content");
    $.ajax({
        url: "/service-diskusi/get-belum-terjawab",
        type: "post",
        headers: {"X-CSRF-TOKEN": token},
        success: function (data) {
            if (data != 0) {
                $('#totalTanyaJawab').show();
                $('#totalTanyaJawab').html(data);
            } else {
                $('#totalTanyaJawab').hide();
            }
        },
        error: function (e) {
            // console.log(e)
        }
    });
}

// $('.custom-file-input').on('change', function() {
//     console.log("ff")
//     var fileName = $(this).val();
//     // console.log($(this)[0]);
//     // console.log($(this).prop("outerHTML"));
//     console.log($(this).next('.custom-file-label'));
//     // console.log($(this).next('.custom-file-label').html());
//     $(this).next('.custom-file-label').html(fileName);
//
// });