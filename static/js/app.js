const myApi = new Stackoverflowapi;
const ui = new UI;
const auth = new Auth;
//Get the user object
const user = Auth.getUser();

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

const profileQuestions = document.querySelector('main-content');
if (profileQuestions) {
    profileQuestions.addEventListener('click', getaQuestion);
}

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
                    return ui.loadMessage(data.question.message, 'error');

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

//Get the answers wrapper
const answers = document.getElementById('answers');
//Add an event listener
answers.addEventListener('click', (e) => {
    //Prevent from redirecting
    e.preventDefault();

    const target = e.target;
    // console.log(target.className);
    // console.log(target.getAttribute('href'));
    const url = target.getAttribute('href');
    if (target.classList.contains('upvote')) {
        myApi.downvoteAnswer(url, user.access_token)
            .then(data => {
                if (data.message === 'Answer upvoted successfully') {
                    // console.log(data.message);
                    //Get the digits from the textContent
                    let num = target.textContent.match(/\d+/g);
                    let numVal;
                    for (let i = 0; i < num.length; i++) {
                        numVal = parseInt(num[i]) + 1;

                    }
                    //Assign the new textContent
                    target.textContent = `Upvote(${numVal})`;
                }
            })
    } else if (target.classList.contains('downvote')) {
        myApi.downvoteAnswer(url, user.access_token)
            .then(data => {
                if (data.message === 'Answer downvoted successfully') {
                    // console.log(data.message);
                    //Get the digits from the textContent
                    let num = target.textContent.match(/\d+/g);
                    let numVal;
                    for (let i = 0; i < num.length; i++) {
                        numVal = parseInt(num[i]) + 1;

                    }
                    //Assign the new textContent
                    target.textContent = `Downvote(${numVal})`;
                }
            })
    } else {
        
    }
});

//Add event listener to trigger the rendering of the register page, login, logout & profile

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
    } else if (target.parentElement.classList.contains('profile')) {
        //Load the profile page
        // console.log('Profile page');
        //Pass the access_token to the method for auth
        myApi.getCurrentUserQuestions(user.access_token)
            .then(data => {
                if (data.message) {
                    //Questions not found
                    console.log(data.message);
                } else {
                    //Pass the questions to the profile loader
                    ui.loadProfile(data);
                }
            })
    }
}

//Handel the register functionality
function registerUser() {
    //Get the values        
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //Create a user object
    const user = {
        username,
        email,
        password
    };

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
    const user = {
        username,
        password
    };

    //Handle the login
    auth.login(user)
        .then(data => {
            if (data.message) {
                console.log(data.message);
            }
        })
}

//Get the aside wrapper for profile actions
const MainWrapper = document.getElementById('main');
//Add event listener to the wrapper

MainWrapper.addEventListener('click', mainPage);

function mainPage(e) {
    e.preventDefault();
    const target = e.target;
    if (target.parentElement.classList.contains('post-question')) {
        //Load the page for posting a question
        ui.loadPostQuestionPage();
    }
}

//Handle posting of question
function postQuestion() {
    //Get the values        
    const title = document.getElementById('title').value;
    const description = document.getElementById('question-description').value;
    //Create a user object
    const question = {
        title,
        description
    };
    myApi.postQuestion(question, user.access_token)
        .then(data => {
            if (data.message === 'Question created successfully.') {
                ui.loadMessage(data.message, 'success');
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            }//Display errors
            else if (data.message !== 'Question created successfully.') {
                //Load the error message
                ui.loadMessage(data.message.title, 'error');
            }else if (data.message.title) {
                // console.log(data.message.title);
                ui.loadMessage(data.message.title, 'error');
            }
            else if (data.message.description) {
                // console.log(data.message.description);
                ui.loadMessage(data.message.description, 'error');
            }
            else {
                // console.log(data.description);
                ui.loadMessage(data.description, 'error');
            }
        })
}