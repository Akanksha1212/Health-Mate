var backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];
var borderColors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'];

function generateChartObject(i, question, dates, answers) {
	var ctx = $('#chart-' + i);
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [{
				label: question,
				data: answers,
				fill: true,
				borderColor: borderColors[i],
				backgroundColor: backgroundColors[i],
				tension: 0.1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					min: 0,
					max: 5,
					ticks: {
						stepSize: 1
					}
				}
			}
		}
	});
}


$(document).ready(function (e) {
    $('#collective_dropdown').on('change', function () {
        fetchData($('#collective_dropdown :selected').val());
    });
});

function fetchData(username) {
    $.ajax({
        url: "/api/get_firebase_data/" + username,
        type: "GET",
        async: true,
        timeout: 6000,
        beforeSend: function (xhr, settings) {
        	$('#collective_dropdown').attr('disabled', true);
        },
        success: function (data) {
            renderPlots(data);
            $('#collective_dropdown').attr('disabled', false);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('ERROR: ' + errorThrown);
            return false;
        }
    });
};

function renderPlots(data) {
	console.log(data);
	var dates = []
	var questions = []
	var answers = []

	for (const [key, value] of Object.entries(data)) {
		dates.push(key);
		questions = [value[0]['ques'], value[1]['ques'], value[2]['ques'], value[3]['ques'], value[4]['ques']]
		answers.push([value[0]['ans'], value[1]['ans'], value[2]['ans'], value[3]['ans'], value[4]['ans']])
	}

	console.log(dates);
	console.log(questions);
	console.log(answers);

	for (let i = 0; i < questions.length; i++) {
		generateChartObject(i, questions[i], dates, [answers[0][i], answers[1][i], answers[2][i]]);
	}
};