import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {CategoriesResponseType, ItemVacanciesType, vacanciesApi, VacanciesResponseType} from "../../api/vacanciesApi";


export const getVacancies = createAsyncThunk('vacancies/getVacancies', async (param:{catalogues?:number,payment_from?:number,payment_to?:number, keyword?:string }, thunkAPI) => {
    try {
        const res = await vacanciesApi.getVacancies(param?.catalogues,param?.payment_from,param?.payment_to, param?.keyword);
        console.log('VACANCIES', res.data.objects)

        thunkAPI.dispatch(setVacancies({objects: res.data.objects}))
        return {objects: res.data.objects}

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
// export const searchVacancies = createAsyncThunk('vacancies/searchVacancies', async (param, thunkAPI) => {
//     try {
//         const res = await vacanciesApi.searchVacancies();
//         console.log('searchVacancies', res.data.objects)
//
//         thunkAPI.dispatch(setVacancies({objects: res.data.objects}))
//         return {objects: res.data.objects}
//
//     } catch (err) {
//         const error: AxiosError = err as AxiosError;
//         return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
//     }
// })

export const getFavorite = createAsyncThunk('vacancies/setFavorite', async (param, thunkAPI) => {
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
export const getCategories = createAsyncThunk('vacancies/getCategories', async (param, thunkAPI) => {
    try {
        const res = await vacanciesApi.getСatalogues();
        console.log('CATEGORIES', res.data)
        thunkAPI.dispatch(setCategories(res.data))
        return {categories: res.data}

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})


export const setFavoriteStatus = createAsyncThunk('vacancies/setFavorite', async (param: { id: number }, thunkAPI) => {
    try {
        const res = await vacanciesApi.setFavorite(param.id);
        console.log('FAVORITE', res.data)
        thunkAPI.dispatch(setStatus({id: param.id, favoriteStatus: true}))
        return

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const setNoFavoriteStatus = createAsyncThunk('vacancies/setNoFavorite', async (param: { id: number }, thunkAPI) => {
    try {
        const res = await vacanciesApi.setNoFavorite(param.id);
        thunkAPI.dispatch(setNoStatus({id: param.id, favoriteStatus: false}))
        return

    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})


export const asyncAction = {
    getVacancies,
    setFavoriteStatus,
    getCategories,
    // searchVacancies,
}


export const slice = createSlice({
    name: 'vacancies',
    initialState: <InitialStateType>{
        categories: [],
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
                    candidat: '',
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
                    vacancyRichText: '',
                }
            ]
        }
    },
    reducers: {
        setVacancies(state, action: PayloadAction<VacanciesResponseType>) {
            state.vacancies.objects = action.payload.objects
        },
        setCategories(state, action: PayloadAction<CategoriesResponseType>) {
            state.categories = action.payload
        },
        setStatus(state, action: PayloadAction<{ id: number, favoriteStatus: boolean }>) {
            const index = state.vacancies.objects.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.vacancies.objects[index].favorite = action.payload.favoriteStatus;
            }
        },
        setNoStatus(state, action: PayloadAction<{ id: number, favoriteStatus: boolean }>) {
            const index = state.vacancies.objects.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.vacancies.objects[index].favorite = action.payload.favoriteStatus;
            }
        },

    },
})

export const vacancies = slice.reducer;

export const {
    setVacancies,
    setCategories,
    setStatus,
    setNoStatus,
} = slice.actions


type InitialStateType = {
    vacancies: { objects: Array<ItemVacanciesType> }
    categories: CategoriesResponseType
}