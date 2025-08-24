import { login } from './api.js';

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const user = await login(username, password);
   if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
   alert('Usuário ou senha inválidos');
  }
});