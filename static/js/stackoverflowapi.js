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
}