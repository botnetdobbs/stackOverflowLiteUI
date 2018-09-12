class Auth extends Stackoverflowapi {
    constructor() {
        super();
        this.access_token;
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
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }
}