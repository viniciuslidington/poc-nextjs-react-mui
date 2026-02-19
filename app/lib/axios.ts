import axios from 'axios';

export const apiRickAndMorty = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
})

export const apiInterna = axios.create({
  baseURL: '/api',
})