class Stackoverflowapi {
    constructor() {
        //The API url
        this.url = 'http://127.0.0.1:5000/api/v2';
    }

    //Get all the questions
    getQuestions() {
        return new Promise((resolve, reject) => {
            fetch(this.url+'/questions')
                .then(response => {return response.json();})
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    //Get a single question
    async getQuestion(url) {
        // return new Promise((resolve, reject) => {
        //     fetch(url)
        //         .then(response => {return response.json();})
        //         .then(data => {
        //             resolve(data);
        //         })
        //         .catch(err => reject(err));
        // });
        // return new Promise((resolve, reject) => {
        //     fetch(url+'/answers')
        //         .then(response => {return response.json();})
        //         .then(data => {
        //             resolve(data);
        //         })
        //         .catch(err => reject(err));
        // });

        //Use async await
        const questionResponse = await fetch(url);
        const answerResponse = await fetch(url+'/answers');

        //Wait for the requests to finish then save the responses to the following variables
        const question = await questionResponse.json();
        const answers = await answerResponse.json();

        //Return an object
        return {
            question,
            answers
        }
    }

    
}