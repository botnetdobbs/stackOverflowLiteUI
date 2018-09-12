const myApi = new Stackoverflowapi;
const ui = new UI;

//Fetch the questions When the dom content loads
document.addEventListener('DOMContentLoaded', () => {
    myApi.getQuestions()
        .then(data => {
            if (data.message) {
                ui.loadNotFound(data.message);
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
                    return ui.loadNotFound(data.question.message);
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

//Add event listener to trigger the rendering of the register page

//Get the nav bar
const navBar = document.getElementById('nav');
navBar.addEventListener('click', renderAuth);

function renderAuth(e) {
    //Get the target
    const target = e.target;
    //Confirn that the target is register button
    if (target.parentElement.classList.contains('register')) {
        ui.loadRegister();
    } else if (target.parentElement.classList.contains('login')){
        ui.loadLogin();
    }
}