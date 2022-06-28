import axios from 'axios';
import { URL_API } from './base';

const api = axios.create({
	baseURL: URL_API
});

const sucess = (res: any) => res;
const error = (err: any) => {
	return Promise.reject(err);
};

api.interceptors.response.use(sucess, error);

export default api;
