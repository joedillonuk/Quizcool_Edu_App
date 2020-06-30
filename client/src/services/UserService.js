const baseURL = 'http://localhost:3000/api/users/';

export default {
  getUsers() {
    return fetch(baseURL)
    .then(res => res.json());
  },

  updateUser(user) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json());
  },

  deleteUser(id) {
    return fetch(baseURL + id, {
      method: 'DELETE',
    });
  },
  getUserById(id) {
    return fetch(baseURL + id)
    .then(res => res.json());
  },

  updateExistingUser(id, data) {
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json());
  },
};
