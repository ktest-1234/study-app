import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const baseUrl = 'http://127.0.0.1:8000'
export const api = axios.create({
    'baseURL':baseUrl
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function refreshAccessToken(failedRequest){
    const data = axios.post(`${baseUrl}/api/token/refresh`, {
        refreshToken: localStorage.getItem('refreshToken')
    })

    localStorage.setItem('accessToken', data.tokens.access)
    failedRequest.response.config.headers.Authorization = `Bearer ${data.tokens.access}`
}

createAuthRefreshInterceptor(api, refreshAccessToken)
