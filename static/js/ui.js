class UI extends Stackoverflowapi {
    constructor() {
        super();
        this.questionwrapper = document.getElementById('all-questions');
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
    
}