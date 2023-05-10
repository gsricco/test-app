import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {authUserApi} from "../../api/authUserApi";
import {ItemVacanciesType, vacanciesApi, VacanciesResponseType} from "../../api/vacanciesApi";
import favorites from "../favorites/Favorites";


export const authUser = createAsyncThunk('auth/authUser', async (param, thunkAPI) => {
    try {
        const res = await authUserApi.authUser();
        console.log('AUTH', res.data)
        return;

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const getVacancies = createAsyncThunk('auth/getVacancies', async (param, thunkAPI) => {
    try {
        const res = await vacanciesApi.getVacancies();

        console.log('VACANCIES', res.data.objects)

        thunkAPI.dispatch(setVacancies({objects: res.data.objects}))
        return {objects: res.data.objects}

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const getFavorite = createAsyncThunk('auth/setFavorite', async (param, thunkAPI) => {
    try {
        const res = await vacanciesApi.getFavorites();
        console.log('FAVORITE', res.data.objects)

        thunkAPI.dispatch(setVacancies({objects: res.data.objects}))
        return {objects: res.data.objects}

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const setFavoriteStatus = createAsyncThunk('auth/setFavorite', async (param:{id:number}, thunkAPI) => {
    try {
        const res = await vacanciesApi.setFavorite(param.id);
        console.log('FAVORITE', res.data.objects)

        return

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})


export const asyncAction = {
    authUser,
    getVacancies,
    setFavoriteStatus,
}
//
//
export const slice = createSlice({
    name: 'auth',
    initialState: {
        access_token: '',
        vacancies: {
            objects: [
                {
                    id: 25746005,
                    id_client: 544932,
                    payment_from: 0,
                    payment_to: 0,
                    date_pub_to: 1371640666,
                    date_archived: 1371640666,
                    date_published: 1371554266,
                    address: null,
                    payment: null,
                    profession: "Специалист по согласованиям",
                    work: "1. Подготовка, согласование с Комитетами и службами...",
                    metro: [
                        {
                            id: 229,
                            title: "Сенная площадь",
                            id_metro_line: 2
                        },
                        {
                            id: 229,
                            title: "Сенная площадь",
                            id_metro_line: 2
                        },
                        {
                            id: 229,
                            title: "Сенная площадь",
                            id_metro_line: 2
                        }
                    ],
                    currency: "rub",
                    candidat:'',
                    moveable: true,
                    agreement: true,
                    anonymous: false,
                    type_of_work: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    place_of_work: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    education: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    experience: {
                       id: 6,
                        title: "Полный рабочий день"
                    },
                    maritalstatus: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    children: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    already_sent_on_vacancy: false,
                    // languages: [],
                    // driving_licence: [],
                    catalogues: [
                        {
                            id: 438,
                            title: "Продажи",
                            positions: [
                                {
                                    id: 441,
                                    title: "Бытовая техника, электроника, фото, видео"
                                },
                            ]
                        }
                    ],
                    agency: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    town: {
                        id: 6,
                        title: "Полный рабочий день",
                        declension: "в Санкт-Петербурге",
                        genitive: "Санкт-Петербурга"
                    },
                    client_logo: "https://public.superjob.ru/images/clients_logos.ru/544932.gif",
                    age_from: 35,
                    age_to: 45,
                    gender: {
                        id: 6,
                        title: "Полный рабочий день"
                    },
                    firm_name: "Комплекс Галерная 5",
                    firm_activity: "ООО «Комплекс Галерная 5» – дочернее общество...",
                    link: "https://www.superjob.ru/vakansii/specialist-po-soglasovaniyam-25746005-130520.html",
                    vacancyRichText:'',
                }
            ]
        }
    },
    reducers: {
        setVacancies(state, action: PayloadAction<VacanciesResponseType>) {
            state.vacancies.objects = action.payload.objects
        },

    },
})

export const auth = slice.reducer;

export const {
    setVacancies,
    // setFavorite,
} = slice.actions


type InitialStateType = {
    access_token: string
    vacancies: { objects: Array<ItemVacanciesType> }
}