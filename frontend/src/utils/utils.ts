import { AxiosRequestConfig } from 'axios';

export function getHeaders(method = 'GET', token: string, body?: any): AxiosRequestConfig {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      Authorization: `Bearer ${token}`,
    },
    method,
    data: body,
  };
}
