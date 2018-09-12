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
