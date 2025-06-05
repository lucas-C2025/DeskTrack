import { getDevices, addDevice, deleteDevice, getActivities, addUser, deleteUser } from './api.js';

async function loadDevices() {
  const devices = await getDevices();
  const list = document.getElementById('deviceList');
  list.innerHTML = '';
  devices.forEach(d => {
    const li = document.createElement('li');
    li.textContent = `${d.nome} - ${d.ip}`;
    li.className = 'border-b py-2 flex justify-between items-center';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'bg-red-500 text-white px-2 py-1 rounded';
    deleteBtn.onclick = async () => {
      await deleteDevice(d.id);
      loadDevices();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

async function loadActivities() {
  const activities = await getActivities();
  const list = document.getElementById('activityList');
  list.innerHTML = '';
  activities.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.data_hora} - ${a.descricao}`;
    li.className = 'border-b py-2';
    list.appendChild(li);
  });
}

document.getElementById('deviceForm').addEventListener('submit', async e => {
  e.preventDefault();
  const nome = e.target.nome.value;
  const ip = e.target.ip.value;

  await addDevice({ nome, ip });
  e.target.reset();
  loadDevices();
});

loadDevices();
loadActivities();