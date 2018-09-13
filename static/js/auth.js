class Auth extends Stackoverflowapi {
    constructor() {
        super();
        this.access_token;
    }

    register(user) {
        return new Promise((resolve, reject) => {
            fetch(this.url+'/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
                .then(response => {return response.json();})
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    
    login(user) {
        return new Promise((resolve, reject) => {
            fetch(this.url+'/auth/login', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(user)
                        })
                .then(response => {return response.json();})
                .then(data => {
                    if (data.access_token) {
                        localStorage.setItem('user', JSON.stringify(data));
                        document.querySelector('login-button').style.display ='none';
                    }
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }
}