import axios from "axios";
import {ACCESS_TOKEN, ApiKey} from "../enums/apiKey";


const access_token =  localStorage.getItem('access_token')
const setting = {
    headers: {
        'X-Api-App-Id': ApiKey.CLIENT_SECRET,
        // 'Authorization': `Bearer r.000000010000001.example.access_token`,
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        // 'access_token':'Token v3.r.137440105.609208ee69f60d7b563b7f1c65fd4e03e3086296.4f4736e4f5362fa1307beb418926273b90264972'
    },
}
const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com',
    ...setting
})
const ids = [34334294, 46150696];
const postData = {
    ids: ['34333315', '41297011']
};
// const postData = [{0:'34333315'}, {1:'41297011'}]

export const vacanciesApi = {

    getVacancies(catalogues?:number, payment_from?:number, payment_to?:number, keyword?:string) {
        return instance.get<VacanciesResponseType>('/2.0/vacancies/', {
            params:{
                catalogues,
                payment_from,
                payment_to,
                keys:keyword
            }
        })
    },
    getFavorites() {
        return instance.get<VacanciesResponseType>(`/2.0/favorites/`,{
            params: {
                login: ApiKey.LOGIN,
                password: ApiKey.PASSWORD,
                client_id: ApiKey.CLIENT_ID,
                client_secret: ApiKey.CLIENT_SECRET,
                access_token:ACCESS_TOKEN
            }
        })
    },
    getСatalogues() {
        return instance.get<CategoriesResponseType>(`/2.0/catalogues/`,{
            params: {
                login: ApiKey.LOGIN,
                password: ApiKey.PASSWORD,
                client_id: ApiKey.CLIENT_ID,
                client_secret: ApiKey.CLIENT_SECRET,
                access_token:access_token
            }
        })
    },

    setFavorite(id: number) {
        return instance.post<{"result": boolean }>(`/2.0/favorites/`, null,{
            // params: postData,
            params: {
                id_vacancy:id,
                access_token:access_token
            },
        } )
    },
 setNoFavorite(id: number) {
        return instance.delete<{"result": boolean }>(`/2.0/favorites/`, {
            // params: postData,
            params: {
                id_vacancy:id,
                access_token:access_token
            },
        } )
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
type TitleCategoriesType ={
    title_rus:string
    url_rus:string
    title:string
    id_parent:number
    key:number
}
type ItemCategoriesType ={
           title_rus:string
            url_rus:string
            title:string
            title_trimmed:string
            key:number
            positions:Array<TitleCategoriesType>
}
export type CategoriesResponseType = Array<ItemCategoriesType>
