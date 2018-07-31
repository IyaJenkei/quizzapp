var state = {
	questionCount: 0,
	score : 0,
	questions : [
	{
		text : "What is the average return of the S and P 500 index after inflation?",
		answers : ["7%", "10", "5%", "15%"],
		answer : "7%"
	},
	{
		text: "What is the yearly maximum amount you can contribute to an IRA?",
		answers: ["5500(6500 if over 50)", "10000(11500 if over 50", "3000(5500 if over 50", "6500(7000 if over 50)"],
		answer: "5500(6500 if over 50)"
	},
	{
		text: "What is the yearly maximum amount you can contribute to a 401k?",
		answers: ["18000", "15000", "25000", "10000"],
		answer: "18000"
	},
	{
		text: "What is the Federal Reserves target inflation rate?",
		answers: ["2 %", "3 %", "5 %", "1.5 %"],
		answer: "2 %"
	},
	{
		text: "What is a dividend?",
		answers: ["Earnings paid to shareholders", "interest paid on an investment", "when a company buys shares back"],
		answer: "Earnings paid to shareholders"
	},
	{
		text: "What is a covered call?",
		answers: ["a contract to buy the stock without owning the stock", "a contract to sell a stock while owning the stock",
					"a contract to sell a stock without owning the stock", "a contract to sell a stock at two different prices"],
		answer: "a contract to sell a stock while owning the stock"
	},
	{
		text: "If interest rates go down how are bond prices affected?",
		answers: ["They go up", "they go down", "they are unaffected", "there is no relationship between bonds and interest rates"],
		answer: "They go up"
	},
	{
		text: "which type of bond is the safest?",
		answers: ["US treasury", "municipal", "corporate", "junk"],
		answer: "US treasury"
	},
	{
		text: "What does owning stock mean?",
		answers: ["you own part of a company", "you have lent the company money"],
		answer: "you own part of a company"
	},
	{
		text: "Suppose you owe 5,000 on a loan and the interest rate is 20% a year compounded annually. If you didn't pay anything on it, how long would it take for the amount you owe to double?",
		answers: ["4 years", "3 years", "5 years", "6 years"],
		answer: "4 years"
	},

	]
}

$('#start-quiz').click(function (e) {
	toggleTag("quiz");
	renderQuestion();

});

function toggleTag(tag) {
	$("#start").attr("hidden", true);
	$("#quiz").attr("hidden", true);
	$("#final").attr("hidden", true);
	$("#" + tag).attr("hidden", false);
}

$('#submit-question').click(function (e) {
	var radioValue = $("input[name='answer']:checked").val();
	//if answer is correct gonext immediately, if the answer is not correct it will settimeout.
	if (radioValue !== undefined) {
		if (radioValue === state.questions[state.questionCount].answer) {
			state.score++;
			goNext();
		}
		else {
			$(".correct-answer").addClass("green");
			setTimeout(goNext, 2000);
		}
	}
});

function goNext() {
	if (state.questionCount >= state.questions.length - 1) {
		toggleTag("final");
	}
	else {
		state.questionCount++;
		renderQuestion();
	}
}

function renderQuestion() {
	$("#question-number").text((state.questionCount)+1);
	let question = state.questions[state.questionCount];
	$("#question-text").text(question.text);
	$(".panel-body").empty();
	$("#question-total").text(state.questions.length);
	$("#score-number").text(state.score);
	for (i = 0; i < question.answers.length; i++) {
		if (question.answers[i] === state.questions[state.questionCount].answer) {
			$(".panel-body").append(`
			<div class="answer">
				<input type="radio" name="answer" value="` + question.answers[i] + `" class="answers-button" tabindex="` + 1 + `">
					<span class="answer-text correct-answer">` + question.answers[i] + `</span>
			</div>`);
		}
		else {
			$(".panel-body").append(`
			<div class="answer">
				<input type="radio" name="answer" value="` + question.answers[i] + `" class="answers-button" tabindex="` + 1 + `">
					<span class="answer-text">` + question.answers[i] + `</span>
			</div>`);
		}
	}
	$("#final-score").text((state.score +1) * 10 + "%");
}



$('#retry').click(function (e) {
	toggleTag("start");
	clearState();
});

function clearState() {
	state.questionCount = 0;
	state.score = 0;
}