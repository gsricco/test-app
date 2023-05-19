import axios from "axios";
import {ACCESS_TOKEN, ApiKey} from "../enums/apiKey";

const setting = {
    headers: {
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
}
const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com',
    ...setting
})

export const authUserApi = {
    authUser() {
        return instance.get<AuthResponseType>('/2.0/oauth2/password/', {
            params: {
                login: ApiKey.LOGIN,
                password: ApiKey.PASSWORD,
                client_id: ApiKey.CLIENT_ID,
                client_secret: ApiKey.CLIENT_SECRET
            }
        })
    },
}


type AuthResponseType = {
    access_token: string
    refresh_token: string
    ttl: number
    expires_in: number
    token_type: string
    reg_user_resumes_count: number
}
