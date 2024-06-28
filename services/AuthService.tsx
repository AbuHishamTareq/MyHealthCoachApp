import axios from "../utils/axios";
import { getToken, setToken } from "./TokenService";

export async function login(credentials: any) {
    const { data } = await axios.post('/login', credentials);
    await setToken(data.token);    
}

export async function loadUser() {
    const { data: user } = await axios.get('/user');
    return user;
}

export async function logout() {
    await axios.post('/logout', {});
    setToken(null);
}

export async function sendPasswordResetLink(email:any) {
    const { data } = await axios.post('/forget-password', {email});
}