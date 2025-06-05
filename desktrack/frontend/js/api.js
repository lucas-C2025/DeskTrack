const API_BASE = 'http://localhost:3000';

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/users?username=${username}&password=${password}`);
  const users = await res.json();
  return users.length ? users[0] : null;
}

export async function getDevices() {
  const res = await fetch(`${API_BASE}/devices`);
  return res.json();
}

export async function deleteDevice(id) {
  await fetch(`${API_BASE}/devices/${id}`, {
    method: 'DELETE'
  });
}

export async function addUser(user) {
  await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
}

export async function deleteUser(id) {
  await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE'
  });
}

export async function addDevice(device) {
  await fetch(`${API_BASE}/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device)
  });
}

export async function getActivities() {
  const res = await fetch(`${API_BASE}/activities`);
  return res.json();
}