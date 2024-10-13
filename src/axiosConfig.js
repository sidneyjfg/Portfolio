import axios from 'axios';

// Criação de uma instância Axios personalizada
const api = axios.create({
  baseURL: '', // Você pode definir uma URL base aqui, se necessário
  timeout: 10000, // Tempo limite de 10 segundos para a requisição
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador de requisição (para adicionar tokens ou outra lógica antes de enviar a requisição)
api.interceptors.request.use(
  (config) => {
    // Se precisar adicionar um token de autenticação, pode fazer isso aqui
    // Exemplo: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de resposta (para lidar com respostas específicas, como erros globais)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
