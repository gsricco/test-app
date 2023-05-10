import axios from "axios";
import ItemVacancies from "../pages/jobSearch/itemsVacancies/ItemVacancies";
import {ApiKey} from "../enums/apiKey";

const setting = {
    headers: {
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        'Authorization': 'Bearer r.000000010000001.example.access_token',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
}
const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com',
    ...setting
})


export const vacanciesApi = {
    getVacancies() {
        return instance.get<VacanciesResponseType>('/2.0/vacancies/')
    },
    getFavorites() {
        return instance.get<VacanciesResponseType>(`/2.0/favorites/`,{
            params: {
                login: ApiKey.LOGIN,
                password: ApiKey.PASSWORD,
                client_id: ApiKey.CLIENT_ID,
                client_secret: ApiKey.CLIENT_SECRET,
                access_token:ApiKey.ACCESS_TOKEN
            }
        })
    },
    setFavorite(id: number) {
        return instance.post<VacanciesResponseType>(`/2.0/favorites/${id}/`)
    },

}
type MetroType = {
    id: number
    title: string
    id_metro_line: number
}
type TypeOfWorkType = {
    id: number
    title: string
}
export type ItemVacanciesType = {
    id: number
    id_client: number
    payment_from: number
    payment_to: number
    date_pub_to: number
    date_archived: number
    date_published: number
    address: null
    payment: null
    profession: string
    work: string
    metro: Array<MetroType>
    candidat:string,
    currency: string
    moveable: boolean
    agreement: boolean
    anonymous: boolean
    type_of_work: TypeOfWorkType
    place_of_work: TypeOfWorkType
    education: TypeOfWorkType
    experience: TypeOfWorkType
    maritalstatus: TypeOfWorkType
    children: TypeOfWorkType
    already_sent_on_vacancy: boolean
    // languages: never[]
    // driving_licence: []
    catalogues: Array<
        {
            id: number,
            title: string,
            positions: Array<TypeOfWorkType>

        }>,
    agency: TypeOfWorkType
    town: {
        id: number,
        title: string
        declension: string
        genitive: string
    },
    client_logo: string
    age_from: number
    age_to: number
    gender: TypeOfWorkType
    firm_name: string
    firm_activity: string
    link: string
    vacancyRichText:string
    favorite?:boolean
}


export type VacanciesResponseType = {
    objects: Array<ItemVacanciesType>
}
