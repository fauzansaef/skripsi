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