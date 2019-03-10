/**
 * Model class
 * Handles the fetching and direct interaction with the API
 */
class Stackoverflowapi {
    constructor() {
        //The API url
        this.url = 'https://radiant-atoll-76789.herokuapp.com/api/v2';
    }
    //Post a question
    postQuestion(question, access_token) {
        return new Promise((resolve, reject) => {
            fetch(this.url + '/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                },
                body: JSON.stringify(question)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        })
    }
    //Update a question
    updateQuestion(question, question_id, access_token) {
        return new Promise((resolve, reject) => {
            fetch(this.url + '/questions/' + question_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                },
                body: JSON.stringify(question)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        })
    }

    postAnswer(url, answer, access_token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `JWT ${access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answer)
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    //Get a unique answe
    getAnswer(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        })
    }

    updateAnswer(url, answer, access_token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `JWT ${access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answer)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    delete(url, access_token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `JWT ${access_token}`
                }
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}