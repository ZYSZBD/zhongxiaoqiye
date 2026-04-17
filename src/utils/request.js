import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api', // 根据实际情况修改
  timeout: 10000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    
    // 根据自定义状态码判断请求是否成功
    // 这里假设 code === 200 为成功，其他为错误
    if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      // 比如：401: Token 过期等特殊处理可以在此扩展
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res.data;
    }
  },
  error => {
    console.error('Response Error:', error);
    ElMessage({
      message: error.message || '网络请求错误',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
