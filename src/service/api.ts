import axios from 'axios';

const api = axios.create({
	baseURL: 'https://rifa-celular-ceiav-default-rtdb.firebaseio.com/'
});

const sucess = (res: any) => res;
const error = (err: any) => {
	return Promise.reject(err);
};

api.interceptors.response.use(sucess, error);

export default api;
