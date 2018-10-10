/**
 * Main JS file
 * Deals with handling of events
 */
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
                ui.loadMessage(data.message, 'error');
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

const profileQuestions = document.querySelector('.main-content');
if (profileQuestions) {
    profileQuestions.addEventListener('click', getaQuestion);
}

function getaQuestion(e) {
    //Prevent from redirecting
    e.preventDefault();
    let target = e.target;
    //Use event delegation
    if (target.parentElement.className === 'description') {
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
                    ui.loadQuestion(data.question, user.username);
                    if (data.answers.message) {
                        //Answre not found
                        console.log(data.answers.message);
                    } else {
                        //Answer found
                        ui.loadAnswers(data.answers, data.question, user.username);
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

    const url = target.getAttribute('href');
    if (target.classList.contains('upvote')) {
        myApi.downvoteAnswer(url, user.access_token)
            .then(data => {
                if (data.message === 'Answer upvoted successfully') {
                    //Get the digits from the textContent
                    let num = target.textContent.match(/\d+/g);
                    let numVal;
                    for (let i = 0; i < num.length; i++) {
                        numVal = parseInt(num[i]) + 1;

                    }
                    //Assign the new textContent
                    target.textContent = `Upvote(${numVal})`;
                } else {
                    //Remove the error status message if it exists
                    ui.removeLoadMessage('error');
                    //Render it
                    let errorp = document.createElement('span');
                    errorp.className = 'error';
                    errorp.textContent = 'Login to upvote';
                    target.parentElement.appendChild(errorp);
                    //Remove after 1.5 seconds
                    setTimeout(() => {
                        target.parentElement.removeChild(errorp);
                    }, 1500)
                }
            })
    } else if (target.classList.contains('downvote')) {
        myApi.downvoteAnswer(url, user.access_token)
            .then(data => {
                if (data.message === 'Answer downvoted successfully') {
                    //Get the digits from the textContent
                    let num = target.textContent.match(/\d+/g);
                    let numVal;
                    for (let i = 0; i < num.length; i++) {
                        numVal = parseInt(num[i]) + 1;

                    }
                    //Assign the new textContent
                    target.textContent = `Downvote(${numVal})`;
                } else {
                    //Remove the error status message if it exists
                    ui.removeLoadMessage('error');
                    //Render the error message
                    let errorp = document.createElement('span');
                    errorp.className = 'error';
                    errorp.textContent = 'Login to downvote';
                    target.parentElement.appendChild(errorp);
                    //Remove after 1.5 seconds
                    setTimeout(() => {
                        target.parentElement.removeChild(errorp);
                    }, 1500)
                }
            })
    } else if (target.classList.contains('solve')) {
        myApi.markAnswerAsSolution(url, user.access_token)
            .then(data => {
                if (data.message === "Answer marked as solution successfully") {
                    //Get the digits from the textContent
                    const title = document.querySelector('.description-parent');
                    const textData = title.textContent;
                    let solve;
                    //If the text includes solution text do nothing
                    if (textData.includes('[SOLUTION]')) {
                        //Do nothing
                    } else {
                        solve = '[SOLUTION]' + textData;
                    }
                    title.textContent = solve;
                }
            })
    } else if (target.classList.contains('delete')) {
        myApi.delete(url, user.access_token)
            .then(data => {
                if (data.message === 'Answer deleted successfully') {
                    ui.loadMessage(data.message, 'success');
                    //remove the answer
                    target.parentElement.remove();
                } else if (data.message !== 'Answer deleted successfully') {
                    ui.loadMessage(data.message, 'error');
                } else if (data.description) {
                    ui.loadMessage(data.description, 'error');
                }
            })
    } else if (target.classList.contains('edit')) {
        myApi.getAnswer(url, user.access_token)
            .then(data => {
                //Load the new form for updating the answer
                ui.loadEditAnswerPage(data);
            })
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
        //Pass the access_token to the method for auth
        myApi.getCurrentUserQuestions(user.access_token)
            .then(data => {
                //Pass the data to the profile loader
                ui.loadProfile(data);
            })
    }
}

//Handel the register functionality
function registerUser() {
    //Get the values        
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Add frontend validation for the username
    const usernameRegex = /^([a-z\d]+-)*[a-z\d]+$/i;

    if (username === "" && email === "" && password === "") {
        ui.loadMessage('The fields are required', 'error', document.querySelector('.login-reg'));
        return false;
    } else if (!usernameRegex.test(username)) {
        ui.loadMessage('The username contains illegal characters', 'error', document.querySelector('.login-reg'));
        return false;
    } else if (username.length < 3 || username.length > 10) {
        ui.loadMessage('The username must not be less than 3  or more than 9 characters', 'error', document.querySelector('.login-reg'));
        return false;
    } else if (!username[0].match(/[a-z]/i)) {
        ui.loadMessage('The username must begin with a letter', 'error', document.querySelector('.login-reg'));
        return false;
    }

    //Create a user object
    const user = {
        username,
        email,
        password
    };
    //get the form
    const registerForm = document.querySelector('.login-reg');

    //Handle the registering
    auth.register(user)
        .then(data => {
            if (data.message === 'User created successfully') {
                //Load the login page and status message
                ui.loadLogin();
                ui.loadMessage('User created successfully. Proceed to login.', 'success', registerForm);
            } if (data.message !== 'User created successfully') {
                ui.loadMessage(data.message, 'error', registerForm);
            } if (data.message.username) {
                ui.loadMessage(data.message.username, 'error', registerForm);
            } if (data.message.email) {
                ui.loadMessage(data.message.email, 'error', registerForm);
            } if (data.message.password) {
                ui.loadMessage(data.message.password, 'error', registerForm);
            }
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
    //get the form
    const loginForm = document.querySelector('.login-reg');
    //Handle the login
    auth.login(user)
        .then(data => {
            if (data.access_token) {
                ui.loadMessage('Successfull login.', 'success', loginForm);
                setTimeout(() => {
                    //redirect to main page after 1 seconds
                    window.location.reload(true);

                }, 1000)
            } else if (data.description) {
                ui.loadMessage(data.description, 'error', loginForm);
            }
        })
        .catch(err => {
            ui.loadMessage(err.message, 'error', loginForm);
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
    }/**
     * Listen for crosspage events
     */
    else if (target.classList.contains('delete-question')) {
        const url = target.getAttribute('href');
        myApi.delete(url, user.access_token)
            .then(data => {
                if (data.message === 'Question deleted successfully.') {
                    ui.loadMessage(data.message, 'success');
                    //Redirect after 2 seconds(Reloading redirects to home page)
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2000);
                } else if (data.message !== 'Question deleted successfully.') {
                    ui.loadMessage(data.message, 'error');
                } else if (data.description) {
                    ui.loadMessage(data.description, 'error');
                }
            })
    } else if (target.classList.contains('edit-question')) {
        const url = target.getAttribute('href');
        myApi.getQuestion(url)
            .then(data => {
                ui.loadEditQuestionPage(data.question);
            })
    }
}

//Handle posting of question
function postQuestion() {
    //Get the values        
    const title = document.getElementById('title').value;
    const description = document.getElementById('question-description').value;
    //Add frontend validation for the title
    if (title === '' && description === '') {
        ui.loadMessage('title and description fields required', 'error', document.querySelector('#form-wrapper'));
        return false;
    }
    if (title === "") {
        ui.loadMessage('title is required', 'error', document.querySelector('#form-wrapper'));
        return false;
    } else if (title.length < 3 || title.length > 30) {
        ui.loadMessage('The title must not be less than 3  or more than30     characters', 'error', document.querySelector('#form-wrapper'));
        return false;
    }
    //Add frontend validation for the description
    if (description === "") {
        ui.loadMessage('description is required', 'error', document.querySelector('#form-wrapper'));
        return false;
    } else if (description.length < 3 || description.length > 300) {
        ui.loadMessage('The description must not be less than 3  or more than 300     characters', 'error', document.querySelector('#form-wrapper'));
        return false;
    } else if (!description[0].match(/[a-z]/i)) {
        ui.loadMessage('The description must begin with a letter', 'error', document.querySelector('#form-wrapper'));
        return false;
    }
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
            } //Display errors
            else if (data.message !== 'Question created successfully.') {
                //Load the error message
                if (data.message.title) {
                    ui.loadMessage(data.message.title, 'error');
                } else if (data.message.description) {
                    ui.loadMessage(data.message.description, 'error');
                } else if (data.message) {
                    ui.loadMessage(data.message, 'error');
                }
            } else if (data.description) {
                ui.loadMessage(data.description, 'error');
            }
        })
}


//Handle updating of question
function updateQuestion() {
    //Get the values        
    const title = document.getElementById('title').value;
    const description = document.getElementById('question-description').value;
    const question_id = document.getElementById('question-id').value;
    //Create a user object
    const question = {
        title,
        description
    };
    myApi.updateQuestion(question, question_id, user.access_token)
        .then(data => {
            if (data.id) {
                ui.loadMessage('Question updated successfully', 'success');
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            } //Display errors
            else if (data.message) {
                //Load the error message
                if (data.message.title) {
                    ui.loadMessage(data.message.title, 'error');
                } else if (data.message.description) {
                    ui.loadMessage(data.message.description, 'error');
                } else if (data.message) {
                    ui.loadMessage(data.message, 'error');
                }
            } else if (data.description) {
                ui.loadMessage(data.description, 'error');
            }
        })
}

//Handle posting of an answer
function postAnswer() {
    //Get the values        
    const answer = document.getElementById('answer').value;
    //Add frontend validation for the answers
    const answerRegex = /[a-z\s]{0,255}/;

    if (answer === "") {
        ui.loadMessage('answer is required', 'error', document.querySelector('#form-wrapper'));
        return false;
    } else if (answer.length < 3 || answer.length > 255) {
        ui.loadMessage('The answer must not be less than 3  or more than 255     characters', 'error', document.querySelector('#form-wrapper'));
        return false;
    } else if (!answer[0].match(/[a-z]/i)) {
        ui.loadMessage('The answer must begin with a letter', 'error', document.querySelector('#form-wrapper'));
        return false;
    }
    //Create an answer object
    const thee_answer = {
        answer
    };
    //Get the url for the specific question
    const thee_question = document.getElementById('question-link');
    const questUrl = thee_question.getAttribute('href');

    //Get the form-wrapper
    const ansFormWrapper = document.getElementById('form-wrapper');
    myApi.postAnswer(questUrl + '/answers', thee_answer, user.access_token)
        .then(data => {
            console.log(data);
            if (data.message === 'Answer inserted successfully') {
                ui.loadMessage(data.message, 'success');
                //Reload only the specific page
                //Actions after 1 second
                setTimeout(() => {
                    //Restore form for posting an answer
                    ui.loadAnswerForm();
                    //Update the answer without reloading
                    myApi.getQuestion(questUrl)
                        .then(data => { ui.loadAnswers(data.answers, data.question, user.username); });
                }, 1000);
            } //Display errors
            if (data.message !== 'Answer inserted successfully') {
                //Load the error message
                ui.loadMessage(data.message, 'error', ansFormWrapper);
            }
            if (data.message.answer) {
                ui.loadMessage(data.message.answer, 'error', ansFormWrapper);
            }
            if (data.description) {
                ui.loadMessage(data.description, 'error');
            }
        })
}

function updateAnswer() {
    //Get the values        
    const answer = document.getElementById('answer').value;
    const answer_id = document.getElementById('answer-id').value;
    //Create an answer object
    const thee_answer = {
        answer
    };
    console.log(thee_answer);
    //Get the url for the specific question
    const thee_question = document.getElementById('question-link');
    const questUrl = thee_question.getAttribute('href');
    myApi.updateAnswer(questUrl + `/answers/${answer_id}`, thee_answer, user.access_token)
        .then(data => {
            if (data.message === 'Your answer updated successfully') {
                //Actions after 1 second
                setTimeout(() => {
                    //Restore form for posting an answer
                    ui.loadAnswerForm();
                    //Update the answer without reloading
                    myApi.getQuestion(questUrl)
                        .then(data => { ui.loadAnswers(data.answers, data.question, user.username); });
                }, 1000);
            } //Display errors
            if (data.message !== 'Your answer updated successfully') {
                //Load the error message
                ui.loadMessage(data.message, 'error');
            }
            if (data.message.answer) {
                ui.loadMessage(data.message.answer, 'error');
            }
            if (data.description) {
                ui.loadMessage(data.description, 'error');
            }
        })
}