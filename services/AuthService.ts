import api from '../config/api';
import { User, UserDataRequest } from '../types/User';

const login = (userData: UserDataRequest) => api.put<User>(`/api/login`, userData);

const AuthService = {
  login,
};

export default AuthService;
