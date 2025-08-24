const API_URL = "http://localhost:3000";

function getToken() {
  return localStorage.getItem('@app:token'); // ou '@hostMonitor:token' se estiver usando esse
}

function authHeader() {
  const token = getToken();
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

// -------- DEVICES --------
export async function getDevices() {
  const res = await fetch(`${API_URL}/devices`, {
    headers: { ...authHeader() }
  });
  if (!res.ok) throw new Error("Erro ao buscar dispositivos");
  return res.json();
}

export async function addDevice(device) {
  const res = await fetch(`${API_URL}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(device),
  });
  if (!res.ok) throw new Error("Erro ao adicionar dispositivo");
  return res.json();
}

export async function deleteDevice(id) {
  const res = await fetch(`${API_URL}/devices/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Erro ao excluir dispositivo");
  return true;
}

// -------- ACTIVITIES --------
export async function getActivities() {
  const res = await fetch(`${API_URL}/activities`, {
    headers: { ...authHeader() }
  });
  if (!res.ok) throw new Error("Erro ao buscar atividades");
  return res.json();
}

export async function addActivity(activity) {
  const res = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(activity),
  });
  if (!res.ok) throw new Error("Erro ao adicionar atividade");
  return res.json();
}

export async function deleteActivity(id) {
  const res = await fetch(`${API_URL}/activities/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Erro ao excluir atividade");
  return true;
}


// -------- LOGIN --------

export async function login(username, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Erro no login:", err);
    return null;
  }
}
