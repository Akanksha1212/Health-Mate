//var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
//triggerTabList.forEach(function (triggerEl) {
//  var tabTrigger = new bootstrap.Tab(triggerEl)
//
//  triggerEl.addEventListener('click', function (event) {
//    event.preventDefault()
//    tabTrigger.show()
//  })
//})

var answerMap = {
	'1': 'Not at all',
	'2': 'A little',
	'3': 'Neutral',
	'4': 'Quite a bit',
	'5': 'Very Much'
};

$(document).ready(function (e) {
    $('#patient_name_dropdown').on('change', function () {
        updateData($('#patient_name_dropdown :selected').val());
    });
});

function updateData(username) {
    $.ajax({
        url: "/api/get_firebase_data/" + username,
        type: "GET",
        async: true,
        timeout: 6000,
        beforeSend: function (xhr, settings) {
        	$('#patient_name_dropdown').attr('disabled', true);
            showLoader();
        },
        success: function (data) {
            renderResult(data);
            $('#patient_name_dropdown').attr('disabled', false);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('ERROR: ' + errorThrown);
            return false;
        }
    });
};

function showLoader() {
	var html = `
	<div class="d-flex justify-content-center">
		<div class="spinner-border" role="status"></div>
	</div>
	`;

	$("#response").html(html);
};

function renderResult(data) {
	console.log(data);

	var html = `
			<div class="accordion" id="accordionExample">
	`;

	for (const [key, value] of Object.entries(data)) {
		html += `
				<div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${key}" aria-expanded="false" aria-controls="#collapse-${key}">
                            ${key}
                        </button>
                    </h2>
                    <div id="collapse-${key}" class="accordion-collapse collapse" aria-labelledby="collapse-${key}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Question: <strong>${value[0]["ques"]}</strong><br>Answer: <strong>${answerMap[value[0]["ans"]]}</strong><br><br>
                            Question: <strong>${value[1]["ques"]}</strong><br>Answer: <strong>${answerMap[value[1]["ans"]]}</strong><br><br>
                            Question: <strong>${value[2]["ques"]}</strong><br>Answer: <strong>${answerMap[value[2]["ans"]]}</strong><br><br>
                            Question: <strong>${value[3]["ques"]}</strong><br>Answer: <strong>${answerMap[value[3]["ans"]]}</strong><br><br>
                            Question: <strong>${value[4]["ques"]}</strong><br>Answer: <strong>${answerMap[value[4]["ans"]]}</strong><br><br>
                        </div>
                    </div>
                </div>
		`;
	}

	html += `
			</div>
	`;

	$("#response").html(html);
};