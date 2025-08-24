// auth.js
import { login } from './api.js';

// Listener só funciona se existir o form na página (login.html)
document.getElementById('loginForm')?.addEventListener('submit', async e => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const response = await login(username, password);

    if (response.auth && response.token) {
      signin(response.token); 
    } else {
      alert('Usuário ou senha inválidos');
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert('Erro no servidor, tente novamente mais tarde.');
  }
});

/* ----------------------
   Funções de autenticação
----------------------- */

function getToken() {
  return localStorage.getItem('@app:token');
}

function signin(token) {
  localStorage.setItem('@app:token', token);
  window.location.href = 'dashboard.html';
}

function signout() {
  localStorage.removeItem('@app:token');
  window.location.href = 'login.html';
}

function isAuthenticated() {
  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Exportando para usar em outras páginas
export default { isAuthenticated, getToken, signin, signout };
