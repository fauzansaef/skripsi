$(document).ready(function() {
    let idVersi = $("#idVersi").val();
    var token = $("meta[name='_csrf']").attr("content");
    $.ajax({
        url: "/api/v1/perencanaan/versi_aplikasi/versi_renkerkegiatans/"+idVersi,
        type: "get",
        headers: {"X-CSRF-TOKEN": token},
        success: function (data) {
            console.log(data)
            if(data){
                isiDataKeTabel(data);
            } else {
                errorResult();
            }
        }
    });
})

function isiDataKeTabel(data) {
    // Mengosongkan isi tbody terlebih dahulu
    $('#viewTabelKegiatan tbody').empty();

    // Looping melalui setiap item dalam array JSON
    data.forEach(function(item) {
        // Membuat baris tabel untuk setiap item
        var row = `<tr>
                <td>${item.renkerKegiatan.namaKegiatan}</td>
              </tr>`;
        // Menambahkan baris ke tabel
        $('#viewTabelKegiatan tbody').append(row);
    });
}