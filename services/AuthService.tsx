import axios from "../utils/axios";
import { setToken } from "./TokenService";

export async function login(credentials: any) {
    const { data } = await axios.post('/login', credentials);
    await setToken(data.token);    
}

export async function loadUser() {
    const { data: user } = await axios.get('/user');
    return user;
}

export async function logout() {
    try{
        await axios.get('/logout', {});
        setToken(null);
    } catch(e) {
        console.log(e);
    }
}

export async function sendPasswordResetLink(email:any) {
    const { data } = await axios.post('/forget-password', {email});
}

export async function gethealthParameters(patientId:any) {
    const {data: healthParameters }: any = await axios.get('/healthParameters', {params: {patientId}});
    return healthParameters;
}

export async function gethealthCoaches() {
    const {data: healthCoaches }: any = await axios.get('/healthCoaches');
    return healthCoaches;
}

export async function inserRbsResult(rbsInfo: any) {
    const { data: result } = await axios.post('/insertRbsResult', rbsInfo);
    return result;
}

export async function getRbsData(patientId: any) {
    const {data: rbsDatainfo }: any = await axios.get('/getRbsData', {params: {patientId}});
    return rbsDatainfo;
}

export async function getRbsDetailsFromAPI(patientId: any) {
    const {data: RbsDetailsFromAPI }: any = await axios.get('/getRbsDetailsFromAPI', {params: {patientId}});
    return RbsDetailsFromAPI;
}

export async function inserWeightResult(weightInfo: any) {
    const { data: result } = await axios.post('/insertWeightResult', weightInfo);
    return result;
}

export async function getWeightData(patientId: any) {
    const {data: weightDatainfo }: any = await axios.get('/getWeightData', {params: {patientId}});
    return weightDatainfo;
}

export async function getWeightDetailsFromAPI(patientId: any) {
    const {data: weightDetailsFromAPI }: any = await axios.get('/getWeightDetailsFromAPI', {params: {patientId}});
    return weightDetailsFromAPI;
}

export async function inserBpResult(BpInfo: any) {
    const { data: result } = await axios.post('/insertBpResult', BpInfo);
    return result;
}

export async function getBpData(patientId: any) {
    const {data: bpDatainfo }: any = await axios.get('/getBpData', {params: {patientId}});
    return bpDatainfo;
}

export async function getBpDetailsFromAPI(patientId: any) {
    const {data: bpDetailsFromAPI }: any = await axios.get('/getBpDetailsFromAPI', {params: {patientId}});
    return bpDetailsFromAPI;
}

export async function getChatData(patientId: any) {
    const {data: chatDatainfo }: any = await axios.get('/getChatData', {params: {patientId}});
    return chatDatainfo;
}







