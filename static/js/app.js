const myApi = new Stackoverflowapi;
const ui = new UI;
const auth = new Auth;

//Fetch the questions When the dom content loads
document.addEventListener('DOMContentLoaded', () => {
    myApi.getQuestions()
        .then(data => {
            if (data.message) {
                ui.loadNotFound(data.message);
                //If user is logged in render the user items
                if (Auth.getAccessToken()) {
                    ui.loadUserItems();
                }
            } else {
                ui.loadQuestions(data);
                //If user is logged in render the user items
                if (Auth.getAccessToken()) {
                    ui.loadUserItems();
                }
            }
        })
        .catch(error => console.log(error));
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
                    //If user is logged in render the user items
                    if (Auth.getAccessToken()) {
                        ui.loadUserItems();
                    }
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
                    //If user is logged in render the user items
                    if (Auth.getAccessToken()) {
                        ui.loadUserItems();
                    }
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
    } else if (target.parentElement.classList.contains('login')) {
        ui.loadLogin();
    } else if (target.parentElement.classList.contains('logout')) {
        auth.logout();
        window.location.reload(true);
    } else if(target.parentElement.classList.contains('profile')) {
        //Load the profile page
        console.log('Profile page');
    }
}

//Handel the register functionality
function registerUser() {
        //Get the values        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        //Create a user object
        const user = {username, email, password};
    
        //Handle the registering
        auth.register(user)
            .then(data => {
                console.log(data.message);
            })
}

//Handle the login functionality

function loginUser() {
    //Get the values        
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    //Create a user object
    const user = {username, password};

    //Handle the login
    auth.login(user)
        .then(data => {
            if (data.message) {
                console.log(data.message);
            }
        })
}
