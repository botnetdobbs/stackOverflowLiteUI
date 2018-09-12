const myApi = new Stackoverflowapi;
const ui = new UI;

//Fetch the questions When the dom content loads
document.addEventListener('DOMContentLoaded', () => {
    myApi.getQuestions()
        .then(data => {
            if (data.message) {
                ui.loadQuestionsNotFound(data.message);
            } else {
                ui.loadQuestions(data);
            }
        })
});

//Get the wrapper for single question
const singleQuestion = document.getElementById('all-questions');
//Add an event listener
singleQuestion.addEventListener('click', getaQuestion);

function getaQuestion(e) {
    //Prevent from redirecting
    e.preventDefault();
    let target = e.target;
    // console.log(target.parentElement.className);
    // console.log(target.getAttribute('href'))
    //Use event delegation
    if (target.parentElement.className === 'description') {
        // const url = target.parentElement.previousElementSibling.textContent;
        myApi.getQuestion(target.getAttribute('href'))
            .then(data => {
                if (data.question.message) {
                    //Question not found
                    console.log(data.question.message);
                } else {
                    //Question/s found
                    // console.log(data.question);
                    ui.loadQuestion(data.question);
                    if (data.answers.message) {
                        //Answre not found
                        console.log(data.answers.message);
                    } else {
                        //Answer found
                        // console.log(data.answers);
                        ui.loadAnswers(data.answers);
                    }
                    ui.loadAnswerForm();
                }
            });
    }
}