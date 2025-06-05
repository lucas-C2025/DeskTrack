const API_BASE = 'http://localhost:3000';

// Função auxiliar para requisições
async function makeRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  
  if (data) options.body = JSON.stringify(data);
  
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  return response.json();
}

// Dispositivos
export async function getDevices() {
  return makeRequest('/devices');
}

export async function addDevice(device) {
  return makeRequest('/devices', 'POST', device);
}

export async function deleteDevice(id) {
  return makeRequest(`/devices/${id}`, 'DELETE');
}

// Atividades
export async function getActivities() {
  return makeRequest('/activities');
}

export async function addActivity(activity) {
  return makeRequest('/activities', 'POST', activity);
}

export async function deleteActivity(id) {
  return makeRequest(`/activities/${id}`, 'DELETE');
}

// Autenticação
export async function login(username, password) {
  const users = await makeRequest(`/users?username=${username}&password=${password}`);
  return users.length ? users[0] : null;
}