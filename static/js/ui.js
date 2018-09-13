class UI extends Stackoverflowapi {
    constructor() {
        super();
        this.mainWrapper = document.getElementById('main');
        this.questionwrapper = document.getElementById('all-questions');
        this.answerWrapper = document.getElementById('answers');
        this.formwrapper = document.getElementById('form-wrapper');
        
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
    loadQuestion(question) {
        //Create a variable to store the questions
        let output = '';
        //Assign the question to the output variable
        output = `
                <article class="question">
                    <h4>Posted by <small>${question.author}</small></h4>
                    <h1 class="description">${question.description} [${question.title}]</h1>
                    <br>
                </article>
                `;
        // console.log(output);
        //Display the questions
        this.questionwrapper.innerHTML = output;
    }

    //Render the answers
    loadAnswers(answers) {
        //Create a variable to store the answers
        let output = '';
            //Loop through each answer adding it to the output variable
            answers.forEach(answer => {
                output += `<li class="answers">
                            <p><h3>${answer.solved === 1? '[SOLUTION]':''}<em>Anonymous</em> says:  </h3>${answer.answer}</p>
                            <a class="items upvote" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}/upvote">Upvote(${answer.upvotes})</a>
                            <a class="items downvote" href="${this.url}/questions/${answer.question_id}/answers/${answer.id}/downvote">Downvote(${answer.downvotes})</a>
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
                    <button type="submit" class="button button-primary">Submit Answer</button>
                </form>`;
        //Display the form
        this.formwrapper.innerHTML = output;
    }

    //Render not found message
    loadNotFound(message) {
        //Remove flash message if already exists
        this.removeLoadNotFound();
        //Create a div element
        const div = document.createElement('div');
        //Add a class to the div
        div.className = 'question-not-found';
        //Add text
        div.appendChild(document.createTextNode(message));
        //Display the message
        // this.mainwrapper.appendChild(div);
        this.mainWrapper.insertBefore(div, this.questionwrapper);
        //Remove the element after 2 seconds
        setTimeout(() => {
            this.mainWrapper.removeChild(div);
        }, 2000);
    }
    //Removes the flash message
    removeLoadNotFound() {
        //Get the flash message
        const flashMessage = document.querySelector('.question-not-found');
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
            <form class="my-form" onsubmit=registerUser()>
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
                <input type="submit" class="button button-primary button-block" value="Register">
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
                <form class="my-form" onsubmit=loginUser()>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter Password">
                    </div>
                    <button class="button button-primary button-block">Login</button>
                    <p class="register">Don't have an account? <a href="#">Register</a></p>
                </form>
            </div>
        `;
        //Render the html
        this.mainWrapper.innerHTML = output;
    }
}