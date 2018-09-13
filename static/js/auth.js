class Auth extends Stackoverflowapi {
    constructor() {
        super();
        this.access_token = Auth.getAccessToken();
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
                        //Save the user object
                        this.addUser(data);
                    }
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    logout() {
        //Remove the user object from the local storage
        localStorage.clear();
    }

    //Add the user data to the local storage
    addUser(user1) {
        let user = user1;
        //Save the user object in local storage
        localStorage.setItem('user', JSON.stringify(user));
    }

    //Get the user data from local storage
    static getUser() {
        let user;
        //If there is no user item set return an empty object, else return the user object
        if (localStorage.getItem('user') === null) {
            user = {};
        } else {
            user = JSON.parse(localStorage.getItem('user'));
        }
        return user;
    }

    static getAccessToken() {
        //Create a variable to store the token
        let access_token;
        //Get the token
        const user = Auth.getUser();
        //Assign to the variable the access_token & return it
        access_token = user.access_token;
        return access_token;
    }
}