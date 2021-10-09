class Auth {

  constructor({url}) {
    this._base_url = url;
  }

  register(email, password) {
    return fetch(`${this._base_url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
      .then(this._handleResponse)
  }

  login (email, password) {
    return fetch(`${this._base_url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
    .then(this._handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })    
  }

  checkToken(token) {
    return fetch(`${this._base_url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._handleResponse);
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const auth = new Auth ({
  url: 'https://auth.nomoreparties.co'
})

export default auth;