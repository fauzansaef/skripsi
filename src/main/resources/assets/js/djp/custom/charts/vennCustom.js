$(document).ajaxSend(function (e, xhr, options) {
    xhr.setRequestHeader(header, token);
});

$(function() {
    $("#cariKLU").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/servicecrm/getKLUAutocomplete",
                dataType: "json",
                headers: {"X-CSRF-TOKEN": token},
                data: {
                    q: request.term
                },
                success : function(data) {
                    if(!data.length){
                        var result = [
                            {
                                label: 'Tidak ada hasil',
                                value: response.term
                            }
                        ];
                        response(result);
                    }
                    else{
                        response($.map(data, function (item) {
                            return {
                                label: item.kd_KLU + "-" + item.nm_KLU,
                                value: item.kd_KLU + "-" + item.nm_KLU,
                            }
                        }));
                    }
                },
            });
        },
        select: function( event, ui ) {
            var value = ui.item.label;
            document.valueSelectedForAutocomplete = value;
        },
        minLength: 2
    });
});


if($('#unitKerja').val() != 0){
    $("#cariUnitKerja").val($('#unitKerja').val());
}

if($('#jenisWP').val() != 0){
    $("#cariJnsWP").val($('#jenisWP').val());
}

if($('#tema').val() != 0){
    $("#cariTema").val($('#tema').val());
}

if($('#klu').val() != 0){
    $("#cariKLU").val($('#klu').val());
}

var data1 = null;
var data2 = null;
var data3 = null;
var data4 = null;
var data5 = null;
var data6 = null;
var data7 = null;
var data8 = null;
var data9 = null;

var sizesVenn = [14, 17, 20];

$.ajax({
    url: "/servicecrm/getPetaRisikoVenn",
    type: "post",
    headers: {"X-CSRF-TOKEN": token},
    data: {v1: $('#unitKerja').val(), v2: $('#jenisWP').val(), v3: $('#tema').val(), v5: $('#klu').val()},
    async: false,
    success: function (data) {
        data1 = data[0];
        data2 = data[1];
        data3 = data[2];
        data4 = data[3];
        data5 = data[4];
        data6 = data[5];
        data7 = data[6];
        data8 = data[7];
        data9 = data[8];
        },
    error: function (e) {
        // console.log(e);
    }
});

var risikoTinggi = [data1, data2, data3];
var sortRisikoTinggi = risikoTinggi.sort(function (a, b) {
    return a - b
});

var risikoSedang = [data4, data5, data6];
var sortRisikoSedang = risikoSedang.sort(function (a, b) {
    return a - b
});

var risikoRendah = [data7, data8, data9];
var sortRisikoRendah = risikoRendah.sort(function (a, b) {
    return a - b
});

var sizeVenn1 = sizesVenn[sortRisikoTinggi.indexOf(data1)]
var sizeVenn2 = sizesVenn[sortRisikoTinggi.indexOf(data2)]
var sizeVenn3 = sizesVenn[sortRisikoTinggi.indexOf(data3)]
var sizeVenn4 = sizesVenn[sortRisikoSedang.indexOf(data4)]
var sizeVenn5 = sizesVenn[sortRisikoSedang.indexOf(data5)]
var sizeVenn6 = sizesVenn[sortRisikoSedang.indexOf(data6)]
var sizeVenn7 = sizesVenn[sortRisikoRendah.indexOf(data7)]
var sizeVenn8 = sizesVenn[sortRisikoRendah.indexOf(data8)]
var sizeVenn9 = sizesVenn[sortRisikoRendah.indexOf(data9)]

Highcharts.chart('container-vennTinggi', {
    chart: {
        height: 300,
        width: 300,
    },
    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var intersection = point.sets.join(', '),
                    name = point.name,
                    ix = point.index + 1,
                    val = point.value;
                return ix + '. Intersection: ' + intersection + '. ' +
                    (point.sets.length > 1 ? name + '. ' : '') + 'Value ' + val + '.';
            }
        }
    },
    plotOptions: {
        venn: {
            dataLabels: {
                style:{
                    "fontWeight": "normal", "color": "#000", "fontSize": "11px", "textAlign": "center"
                },
            },
        },
    },

    series: [{
        type: 'venn',
        name: ' ',
        data: [{
            sets: ['Pelaporan<br>' + data1],
            value: parseInt(sizeVenn1),
            color: Highcharts.getOptions().colors[8],
        }, {
            sets: ['Pembayaran<br>' + data2],
            value: parseInt(sizeVenn2),
            color: Highcharts.getOptions().colors[8],
        }, {
            sets: ['Kebenaran Pelaporan<br>' + data3],
            value: parseInt(sizeVenn3),
            color: Highcharts.getOptions().colors[8],
        }, {
            sets: ['Pelaporan<br>' + data1, 'Pembayaran<br>' + data2],
            value: 5,
            name: ' ',
            color: Highcharts.getOptions().colors[8],
        }, {
            sets: ['Pelaporan<br>' + data1, 'Kebenaran Pelaporan<br>' + data3],
            value: 3,
            name: ' ',
            color: Highcharts.getOptions().colors[8],
        }, {
            sets: ['Pembayaran<br>' + data2, 'Kebenaran Pelaporan<br>' + data3],
            value: 2,
            name: ' ',
            color: Highcharts.getOptions().colors[8],
        }, {
            sets: ['Pembayaran<br>' + data2, 'Kebenaran Pelaporan<br>' + data3, 'Pelaporan<br>' + data1],
            value: 10,
            name: ' ',
            color: Highcharts.getOptions().colors[8],
        }]
    }],
    title: {
        text: 'Risiko Tinggi',
        x: -20,
        style:{
            "color": "#000", "fontSize": "14px"
        },
    },
    subtitle: {
        text: 'X3Y3, X3Y2, X2Y3',
        x: -20,
    }
});

Highcharts.chart('container-vennSedang', {
    chart: {
        height: 300,
        width: 300,
    },
    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var intersection = point.sets.join(', '),
                    name = point.name,
                    ix = point.index + 1,
                    val = point.value;
                return ix + '. Intersection: ' + intersection + '. ' +
                    (point.sets.length > 1 ? name + '. ' : '') + 'Value ' + val + '.';
            }
        }
    },
    plotOptions: {
        venn: {
            dataLabels: {
                style:{
                    "fontWeight": "normal", "color": "#000", "fontSize": "11px", "textAlign": "center"
                },
            }
        }
    },

    series: [{
        type: 'venn',
        name: ' ',
        data: [{
            sets: ['Pelaporan<br>' + data4],
            value: parseInt(sizeVenn4),
            color: Highcharts.getOptions().colors[6],
        }, {
            sets: ['Pembayaran<br>' + data5],
            value: parseInt(sizeVenn5),
            color: Highcharts.getOptions().colors[6],
        }, {
            sets: ['Kebenaran Pelaporan<br>' + data6],
            value: parseInt(sizeVenn6),
            color: Highcharts.getOptions().colors[6],
        }, {
            sets: ['Pelaporan<br>' + data4, 'Pembayaran<br>' + data5],
            value: 5,
            name: ' ',
            color: Highcharts.getOptions().colors[6],
        }, {
            sets: ['Pelaporan<br>' + data4, 'Kebenaran Pelaporan<br>' + data6],
            value: 3,
            name: ' ',
            color: Highcharts.getOptions().colors[6],
        }, {
            sets: ['Pembayaran<br>' + data5, 'Kebenaran Pelaporan<br>' + data6],
            value: 2,
            name: ' ',
            color: Highcharts.getOptions().colors[6],
        }, {
            sets: ['Pembayaran<br>' + data5, 'Kebenaran Pelaporan<br>' + data6, 'Pelaporan<br>' + data4],
            value: 10,
            name: ' ',
            color: Highcharts.getOptions().colors[6],
        }]
    }],
    title: {
        text: 'Risiko Sedang',
        x: -20,
        style:{
            "color": "#000", "fontSize": "14px"
        },
    },
    subtitle: {
        text: 'X1Y3, X2Y2, X3Y1',
        x: -20,
    }
});

Highcharts.chart('container-vennRendah', {
    chart: {
        height: 300,
        width: 300,
    },
    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var intersection = point.sets.join(', '),
                    name = point.name,
                    ix = point.index + 1,
                    val = point.value;
                return ix + '. Intersection: ' + intersection + '. ' +
                    (point.sets.length > 1 ? name + '. ' : '') + 'Value ' + val + '.';
            }
        }
    },
    plotOptions: {
        venn: {
            dataLabels: {
                style:{
                    "fontWeight": "normal", "color": "#000", "fontSize": "11px", "textAlign": "center"
                },
            }
        }
    },

    series: [{
        type: 'venn',
        name: ' ',
        data: [{
            sets: ['Pelaporan<br>' + data7],
            value: parseInt(sizeVenn7),
            color: Highcharts.getOptions().colors[2],
        }, {
            sets: ['Pembayaran<br>' + data8],
            value: parseInt(sizeVenn8),
            color: Highcharts.getOptions().colors[2],
        }, {
            sets: ['Kebenaran Pelaporan<br>' + data9],
            value: parseInt(sizeVenn9),
            color: Highcharts.getOptions().colors[2],
        }, {
            sets: ['Pelaporan<br>' + data7, 'Pembayaran<br>' + data8],
            value: 5,
            name: ' ',
            color: Highcharts.getOptions().colors[2],
        }, {
            sets: ['Pelaporan<br>' + data7, 'Kebenaran Pelaporan<br>' + data9],
            value: 3,
            name: ' ',
            color: Highcharts.getOptions().colors[2],
        }, {
            sets: ['Pembayaran<br>' + data8, 'Kebenaran Pelaporan<br>' + data9],
            value: 2,
            name: ' ',
            color: Highcharts.getOptions().colors[2],
        }, {
            sets: ['Pembayaran<br>' + data8, 'Kebenaran Pelaporan<br>' + data9, 'Pelaporan<br>' + data7],
            value: 10,
            name: ' ',
            color: Highcharts.getOptions().colors[2],
        }]
    }],
    title: {
        text: 'Risiko Rendah',
        x: -20,
        style:{
            "color": "#000", "fontSize": "14px"
        },
    },
    subtitle: {
        text: 'X3Y3, X3Y2, X2Y3',
        x: -20,
    }
});

$("#btnSearchPetaRisiko").click(function(){
    var unitKerja;
    var jnsWP;
    var tema;
    var klu;

    if($('#cariUnitKerja').val() == '' || $('#cariUnitKerja').val() == undefined){
        unitKerja = 0;
    } else{
        unitKerja = $('#cariUnitKerja').val();
    }

    if($('#cariJnsWP').val() == ''){
        jnsWP = 0;
    }else{
        jnsWP = $('#cariJnsWP').val();
    }

    if($('#cariTema').val() == ''){
        tema = 0;
    }else{
        tema = $('#cariTema').val();
    }

    if($('#cariKLU').val() == ''){
        klu = 0;
    }else{
        klu = $('#cariKLU').val().substring(0, 5);
    }

    window.location.href = window.location.origin + "/#/crm/petarisiko/"+unitKerja+"/"+jnsWP+"/"+tema+"/"+klu;
});
