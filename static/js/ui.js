class UI extends Stackoverflowapi {
    constructor() {
        super();
        this.mainWrapper = document.getElementById('main');
        this.questionwrapper = document.getElementById('all-questions');
        this.answerWrapper = document.getElementById('answers');
        this.formwrapper = document.getElementById('form-wrapper');
        this.navbar = document.getElementById('nav');

    }

    //Render the questions
    loadQuestions(questions) {
        //Create a variable to store the questions
        let output = '<h1 class="questions-header">Questions</h1>';
        //Loop through each question adding it to the output variable
        questions.forEach(question => {
            output += `
                <article class="question">
                    <h4>Posted by <small>${question.author}</small></h4>
                    <h1 class="description"><a href="${this.url}/questions/${question.id}">${question.description} [${question.title}]</a></h1>
                </article>
                `;
        });
        // console.log(output);
        //Display the questions
        this.questionwrapper.innerHTML = output;
    }

    //Render a single question
    loadQuestion(question, username) {
        //Create a variable to store the questions
        let output = '';
        //Assign the question to the output variable
        output = `
                <article class="question">
                    <h4>Posted by <small>${question.author}</small></h4>
                    <h1 class="description">${question.description} [${question.title}]</h1>
                    <a href="${this.url}/questions/${question.id}" id="question-link">This should not be displayed</a>
                    
                    ${question.author === username ? `<a class="delete-question" href="${this.url}/questions/${question.id}">DELETE</a>`: ''}
                    ${question.author === username ? `<a class="edit-question" href="${this.url}/questions/${question.id}">EDIT</a>`: ''}
                </article>
                `;
        // console.log(output);
        //Display the questions
        this.questionwrapper.innerHTML = output;
    }

    //Render the answers
    loadAnswers(answers, question, username) {
        //Create a variable to store the answers
        let output = '';
        //Loop through each answer adding it to the output variable
        answers.forEach(answer => {
            output += `<li class="answers">
                            <div>
                                <p class="description-parent"><h3>${answer.solved === 1? '[SOLUTION]':''}<em>${question.author === answer.author ? 'You say': answer.author + ' says'}</em>:  </h3>${answer.answer}</p>
                                <a class="items upvote" id="upvote" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}/upvote">Upvote(${answer.upvotes})</a>
                                <a class="items downvote" id="downvote" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}/downvote">Downvote(${answer.downvotes})</a>
                                ${question.author === username ? `<a class="items solve" id="solve" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}/solved">Mark as Solution</a>`: ''}
                                ${question.author === username || answer.author === username ? `<a class="items delete" id="delete" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}">Delete</a>`: ''}
                                ${question.author === username || answer.author === username ? `<a class="items edit" id="edit" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}">EDIT</a>`: ''}
                            </div>
                        </li>
                `;
        });

        // console.log(output);
        //Display the answer
        this.answerWrapper.innerHTML = output;
    }

    //Render the answer form
    loadAnswerForm() {
        //Create a variable to store the form
        let output = '<hr>';
        //Add the form to the variable
        output = `
                <form action="" method="post" class="my-form" id="add-answer">
                    <h3>Add an answer</h3>
                    <div class="form-group">
                        <label for="answer"></label>
                        <textarea name="answer" id="answer" cols="30" rows="10" placeholder="Enter your answer here"></textarea>
                    </div>
                    <button type="submit" class="button button-primary" onclick=postAnswer()>Submit Answer</button>
                </form>`;
        //Display the form
        this.formwrapper.innerHTML = output;
    }

    // loadEditAnswerForm()

    //Render not found message
    loadMessage(message, elClassName) {
        //Remove flash message if already exists
        this.removeLoadMessage(elClassName);
        //Create a div element
        const div = document.createElement('div');
        //Add a class to the div
        div.className = elClassName;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Display the message
        // this.mainwrapper.appendChild(div);
        document.getElementById('content-container').insertBefore(div, this.mainWrapper);
        //Remove the element after 2 seconds
        setTimeout(() => {
            document.getElementById('content-container').removeChild(div);
        }, 2000);
    }
    //Removes the flash message
    removeLoadMessage(elClassName) {
        //Get the flash message
        const flashMessage = document.querySelector('.' + elClassName);
        //If it exists remove it
        if (flashMessage) {
            flashMessage.remove();
        }
    }

    //Render the register page
    loadRegister() {
        //Create a variable to store the html
        let output = '<h1>Register</h1>';
        output += `
        <div class="login-reg">
            <form class="my-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Enter Username">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password">
                </div>
                <input type="submit" class="button button-primary button-block" onclick=registerUser() value="Register">
                <p>Already have an account? <a href="login.html">Login</a></p>
            </form>
        </div>
        `;

        this.mainWrapper.innerHTML = output;
    }

    //Load login
    loadLogin() {
        //Create a variable to store the html
        let output = '<h1>Login</h1>';
        output += `
            <div class="login-reg">
                <form class="my-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter Password">
                    </div>
                    <button class="button button-primary button-block" onclick=loginUser()>Login</button>
                    <p class="register">Don't have an account? <a href="#">Register</a></p>
                </form>
            </div>
        `;
        //Render the html
        this.mainWrapper.innerHTML = output;
    }

    //Update the navbar if user is logged in
    loadUserItems() {
        let output = '';

        output += `
        <div class="container">
            <ul>
                <li class="profile">
                    <a href="#">Profile</a>
                </li>
                <li class="pull-right logout" id ="logout-button">
                    <a href="#">Logout</a>
                </li>
            </ul>
        </div>
        `;
        this.navbar.innerHTML = output;
    }

    //Render the users profile
    loadProfile(userQuestions) {
        const user = Auth.getUser();
        let output = `<h4>Welcome <em>${user.username}</em>. You have posted ${userQuestions.length} question${userQuestions.length > 1 ? 's': ''}</h4>
                <div class="aside">
                    <table class="my-table" id="actions">
                        <thead>
                            <tr>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="button post-question"><i>Post a New Question</i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        `;

        //Loop through the questions
        userQuestions.forEach(question => {
            output += `
            <div class="main-content">
                <article class="user-questions">
                    <h1 class="description"><a href="${this.url}/questions/${question.id}">${question.description} [${question.title}]</a></h1>
                </article>
            </div>
            `;
        });

        this.mainWrapper.innerHTML = output;
    }

    loadPostQuestionPage() {
        let output = '<h1 class="align-center">Ask Question</h1>';

        output += `
        <form method="POST" class="my-form">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Enter your question title here.">
                </div>
                <div class="form-group">
                    <label for="question-description">Question Description</label>
                    <textarea name="question" id="question-description" cols="30" rows="10" placeholder="Enter Your Question Here"></textarea>
                </div>
            <button type="submit" class="button button-primary" onclick=postQuestion()>Post Question</button>
        </form>
        `;

        this.mainWrapper.innerHTML = output;
    }

    loadEditQuestionPage(question) {
        let output = '<h1 class="align-center">Update Question</h1>';

        output += `
            <form method="POST" class="my-form">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" value="${question.title}">
                    </div>
                    <div class="form-group">
                        <label for="question-description">Question Description</label>
                        <textarea name="question" id="question-description" cols="30" rows="10">${question.description}</textarea>
                    </div>
                    <input type="hidden" id = "question-id" value="${question.id}">
                <button type="submit" class="button button-primary" onclick=updateQuestion()>Update Question</button>
            </form>
            `;

        this.mainWrapper.innerHTML = output;
    }
}