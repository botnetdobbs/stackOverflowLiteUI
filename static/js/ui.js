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
        let output = '';
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
}