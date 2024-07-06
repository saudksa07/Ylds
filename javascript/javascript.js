let answers = [];
const validAnswers = ["برتقال", "تفاح", "ليمون", "بطيخ", "ايسكريم", "بطاطس", "بيتزا", "لحمه"];
const highProbabilityAnswers = ["برتقال", "تفاح", "ليمون", "بطيخ"];
const lowProbabilityAnswers = ["ايسكريم", "بطاطس", "بيتزا", "لحمه"];
const form = document.getElementById('guessForm');
const predictionParagraph = document.getElementById('prediction');
const historyParagraph = document.getElementById('history');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const answer = document.getElementById('answer').value;

    if (!validAnswers.includes(answer)) {
        errorMessage.textContent = 'الإجابة غير صالحة، يرجى إدخال إجابة صحيحة.';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    if (answers.length === 10) {
        answers.shift();  // إزالة أول إجابة إذا كان لدينا 10 إجابات بالفعل
    }

    answers.push(answer);
    document.getElementById('answer').value = '';

    updateHistory();
    predictNextAnswers();
});

function updateHistory() {
    historyParagraph.textContent = 'آخر 10 إجابات: ' + answers.join(', ');
}

function predictNextAnswers() {
    if (answers.length < 10) {
        predictionParagraph.textContent = 'نحتاج إلى 10 إجابات للتخمين.';
        return;
    }

    const answerFrequency = {};
    answers.forEach(ans => {
        if (!answerFrequency[ans]) {
            answerFrequency[ans] = 0;
        }
        answerFrequency[ans]++;
    });

    // إعطاء أوزان أعلى للإجابات ذات الاحتمالية العالية
    highProbabilityAnswers.forEach(answer => {
        if (answerFrequency[answer]) {
            answerFrequency[answer] *= 2;  // تضاعف التكرار للإجابات ذات الاحتمالية العالية
        }
    });

    const sortedAnswers = Object.keys(answerFrequency).sort((a, b) => answerFrequency[b] - answerFrequency[a]);
    const topThreePredictions = sortedAnswers.slice(0, 3);

    predictionParagraph.textContent = 'التوقعات التالية: ' + topThreePredictions.join(', ');
}
