import { 
    getDevices, addDevice, deleteDevice, 
    getActivities, addActivity, deleteActivity 
  } from './api.js';
  
  // Carrega informações do usuário logado
  function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      document.getElementById('currentUser').textContent = user.username;
    }
  }
  
  // Atualiza contadores
  async function updateCounters() {
    const devices = await getDevices();
    const activities = await getActivities();
    
    document.getElementById('devicesCount').textContent = devices.length;
    document.getElementById('activitiesCount').textContent = activities.length;
  }
  
  // Carrega dispositivos com melhor visualização
  async function loadDevices() {
    try {
      const devices = await getDevices();
      const list = document.getElementById('deviceList');
      
      list.innerHTML = devices.length === 0 
        ? '<li class="py-4 text-center text-gray-500">Nenhum dispositivo cadastrado</li>'
        : '';
      
      devices.forEach(device => {
        const li = document.createElement('li');
        li.className = 'py-3 px-2 flex justify-between items-center hover:bg-gray-50';
        li.innerHTML = `
          <div>
            <h4 class="font-medium">${device.nome}</h4>
            <p class="text-sm text-gray-600">${device.ip}</p>
          </div>
          <button class="delete-device bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm" 
                  data-id="${device.id}">
            Excluir
          </button>
        `;
        list.appendChild(li);
      });
    } catch (error) {
      console.error("Erro ao carregar dispositivos:", error);
    }
  }
  
  // Carrega atividades com melhor visualização
  async function loadActivities() {
    try {
      const activities = await getActivities();
      const list = document.getElementById('activityList');
      
      list.innerHTML = activities.length === 0 
        ? '<li class="py-4 text-center text-gray-500">Nenhuma atividade registrada</li>'
        : '';
      
      activities.forEach(activity => {
        const li = document.createElement('li');
        li.className = 'bg-gray-50 p-4 rounded-lg';
        li.innerHTML = `
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <p class="font-medium">${activity.descricao}</p>
              <div class="flex items-center mt-2 text-sm text-gray-600">
                <span class="mr-3">${formatDate(activity.data_hora)}</span>
                ${activity.dispositivo ? `<span class="mr-3">• ${activity.dispositivo}</span>` : ''}
                <span class="px-2 py-1 rounded-full text-xs ${getActivityTypeClass(activity.tipo)}">
                  ${activity.tipo}
                </span>
              </div>
            </div>
            <button class="delete-activity text-red-500 hover:text-red-700 ml-4" 
                    data-id="${activity.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        `;
        list.appendChild(li);
      });
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    }
  }
  
  // Formata data para exibição
  function formatDate(dateString) {
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString('pt-BR', options);
  }
  
  // Retorna classe CSS baseada no tipo de atividade
  function getActivityTypeClass(type) {
    const classes = {
      'configuração': 'bg-green-100 text-green-800',
      'manutenção': 'bg-yellow-100 text-yellow-800',
      'incidente': 'bg-red-100 text-red-800',
      'verificação': 'bg-blue-100 text-blue-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
  }
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', async () => {
    loadUserInfo();
    await loadDevices();
    await loadActivities();
    await updateCounters();
  
    // Evento para adicionar dispositivo
    document.getElementById('deviceForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const device = Object.fromEntries(formData.entries());
      
      try {
        await addDevice(device);
        e.target.reset();
        await loadDevices();
        await updateCounters();
      } catch (error) {
        console.error("Erro ao adicionar dispositivo:", error);
      }
    });
  
    // Evento para adicionar atividade
    document.getElementById('activityForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const activity = Object.fromEntries(formData.entries());
      activity.data_hora = new Date().toISOString();
      
      try {
        await addActivity(activity);
        e.target.reset();
        await loadActivities();
        await updateCounters();
      } catch (error) {
        console.error("Erro ao registrar atividade:", error);
      }
    });
  
    // Delegação de eventos para botões dinâmicos
    document.addEventListener('click', async (e) => {
      // Excluir dispositivo
      if (e.target.classList.contains('delete-device')) {
        if (confirm('Tem certeza que deseja excluir este dispositivo?')) {
          try {
            await deleteDevice(e.target.dataset.id);
            await loadDevices();
            await updateCounters();
          } catch (error) {
            console.error("Erro ao excluir dispositivo:", error);
          }
        }
      }
      
      // Excluir atividade
      if (e.target.classList.contains('delete-activity') || 
          e.target.closest('.delete-activity')) {
        const button = e.target.classList.contains('delete-activity') 
          ? e.target 
          : e.target.closest('.delete-activity');
        
        if (confirm('Tem certeza que deseja excluir esta atividade?')) {
          try {
            await deleteActivity(button.dataset.id);
            await loadActivities();
            await updateCounters();
          } catch (error) {
            console.error("Erro ao excluir atividade:", error);
          }
        }
      }
      
      // Atualizar atividades
      if (e.target.id === 'refreshActivities') {
        await loadActivities();
      }
    });
  });