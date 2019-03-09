class API {
  constructor(access_token) {
    //The API url
    this.url = "https://radiant-atoll-76789.herokuapp.com/api/v2";
    this.access_token = access_token;
  }

  get(path) {
    return new Promise((resolve, reject) => {
      fetch(this.url + path, {
        headers: {
          Authorization: `JWT ${this.access_token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  post(path, data) {
    return new Promise((resolve, reject) => {
      fetch(this.url + path, {
        method: "POST",
        Authorization: `JWT ${this.access_token}`,
        "Content-Type": "application/json",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  put(path, data=null) {
    return new Promise((resolve, reject) => {
      fetch(this.url + path, {
        method: "PUT",
        Authorization: `JWT ${this.access_token}`,
        "Content-Type": "application/json",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  destroy(path) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'DELETE',
          headers: {
              'Authorization': `JWT ${this.access_token}`
          }
      })
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(err => reject(err));
  });
  }
}