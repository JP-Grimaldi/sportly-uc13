import axios from "axios";

// URL base do back-end. As imagens dos produtos sao servidas pelo Express
// em /imagens, entao guardamos a base aqui pra montar o caminho completo.
export const apiBaseURL = "http://localhost:3000";

// Instancia unica do axios usada em todas as paginas que falam com a API.
const api = axios.create({
  baseURL: apiBaseURL,
});

export default api;
