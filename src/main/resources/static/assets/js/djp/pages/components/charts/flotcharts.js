"use strict";

// Class definition
var KTFlotchartsDemo = function() {

	// Private functions

	var demo6 = function() {
		// bar chart:
		var data = GenerateSeries(0);

		function GenerateSeries(added) {
			var data = [];
			var token = $("meta[name='_csrf']").attr("content");

			var result = '';
			$.ajax({
				url: "/servicePemantauan/getDataBar",
				type: "post",
				async: false,
				headers: {"X-CSRF-TOKEN": token},
				success: function (res) {
					result = res;
				}
			});

			for (var i = 0; i < 12; i++) {
				data.push([i, result[i]]);
			}

			return data;
		}

		var dataset = [{ label: "2012 Average Temperature", data: data, color: "#5482FF" }];
		var ticks = [[0, "Jan"], [1, "Feb"], [2, "Mar"], [3, "Apr"],[4, "Mei"], [5, "Jun"], [6, "Jul"], [7, "Agt"], [8, "Sep"], [9, "Okt"], [10, "Nov"], [11, "Des"]];

		var options = {
			colors: [KTApp.getStateColor("success"), KTApp.getStateColor("brand")],
			series: {
				stack: 1,
				bars: {
					show: true
				}
			},
			bars: {
				barWidth: 0.5,
				lineWidth: 0, // in pixels
				shadowSize: 0,
				align: 'center'
			},
			grid: {
				tickColor: "#eee",
				borderColor: "#eee",
				borderWidth: 1
			},
			xaxis: {
				axisLabel: "World Cities",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial',
				axisLabelPadding: 10,
				ticks: ticks
			},
		};

		$.plot($("#kt_flotcharts_6"), [{
			data: data,
			lines: {
				lineWidth: 1,
			},
			shadowSize: 0
		}], options);
	};

	var demo7 = function() {
		// bar chart:
		var data = GenerateSeries(0);

		function GenerateSeries(added) {
			var data = [];
			var token = $("meta[name='_csrf']").attr("content");

			var result = '';
			$.ajax({
				url: "/servicePemantauan/getDataBarInklusi",
				type: "post",
				async: false,
				headers: {"X-CSRF-TOKEN": token},
				success: function (res) {
					result = res;
				}
			});

			for (var i = 0; i < result.length; i++) {
				data.push([i, result[i]]);
			}

			return data;
		}

		var dataset = [{ label: "2012 Average Temperature", data: data, color: "#5482FF" }];
		var ticks = GenerateTicks();

		function GenerateTicks() {
			var data = [];
			var token = $("meta[name='_csrf']").attr("content");

			var result = '';
			$.ajax({
				url: "/servicePemantauan/getDataXSeriesInklusi",
				type: "post",
				async: false,
				headers: {"X-CSRF-TOKEN": token},
				success: function (res) {
					result = res;
				}
			});

			for (var i = 0; i < result.length; i++) {
				data.push([i, result[i]]);
			}

			return data;
		}

		var options = {
			colors: [KTApp.getStateColor("success"), KTApp.getStateColor("brand")],
			series: {
				stack: 1,
				bars: {
					show: true
				}
			},
			bars: {
				barWidth: 0.5,
				lineWidth: 0, // in pixels
				shadowSize: 0,
				align: 'center'
			},
			grid: {
				tickColor: "#eee",
				borderColor: "#eee",
				borderWidth: 1
			},
			xaxis: {
				axisLabel: "World Cities",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial',
				axisLabelPadding: 10,
				ticks: ticks
			},
		};

		$.plot($("#kt_flotcharts_7"), [{
			data: data,
			lines: {
				lineWidth: 1,
			},
			shadowSize: 0
		}], options);
	}

	return {
		// public functions
		init: function() {
			// default charts
			demo6();
			demo7();
		}
	};
}();

jQuery(document).ready(function() {
	KTFlotchartsDemo.init();
});