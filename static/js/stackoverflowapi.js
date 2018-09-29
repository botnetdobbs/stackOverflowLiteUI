/**
 * Model class
 * Handles the fetching and direct interaction with the API
 */
class Stackoverflowapi {
    constructor() {
        //The API url
        this.url = 'http://127.0.0.1:5000/api/v2';
    }

    //Get all the questions
    getQuestions() {
        return new Promise((resolve, reject) => {
            fetch(this.url + '/questions')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    //Get a single question
    async getQuestion(url) {
        //Use async await
        const questionResponse = await fetch(url);
        const answerResponse = await fetch(url + '/answers');

        //Wait for the requests to finish then save the responses to the following variables
        const question = await questionResponse.json();
        const answers = await answerResponse.json();

        //Return an object
        return {
            question,
            answers
        }
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

    //Upvote an answer
    upvoteAnswer(url, access_token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `JWT ${access_token}`
                }
            })
                .then(response => {
                    return response.status;
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    //Downvote an answer
    downvoteAnswer(url, access_token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `JWT ${access_token}`
                }
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
    //Only the question owner can do it
    markAnswerAsSolution(url, access_token) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `JWT ${access_token}`
                }
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

    getCurrentUserQuestions(access_token) {
        return new Promise((resolve, reject) => {
            fetch(this.url + '/user/questions', {
                headers: {
                    'Authorization': `JWT ${access_token}`
                }
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }
}