import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {CategoriesResponseType, ItemVacanciesType, vacanciesApi, VacanciesResponseType} from "../../api/vacanciesApi";


export const getVacancies = createAsyncThunk('vacancies/getVacancies', async (param: {
    catalogues?: number,
    payment_from?: number,
    payment_to?: number,
    keyword?: string
}, thunkAPI) => {
    thunkAPI.dispatch(loadingStatus({isLoading: true}))
    try {
        const res = await vacanciesApi.getVacancies(param?.catalogues, param?.payment_from, param?.payment_to, param?.keyword);
        thunkAPI.dispatch(setVacancies({objects: res.data.objects}))
        thunkAPI.dispatch(loadingStatus({isLoading: false}))
        return {objects: res.data.objects}
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const getFavorite = createAsyncThunk('vacancies/setFavorite', async (param, thunkAPI) => {
    thunkAPI.dispatch(loadingStatus({isLoading: true}))
    try {
        const res = await vacanciesApi.getFavorites();
        thunkAPI.dispatch(setVacancies({objects: res.data.objects}))
        thunkAPI.dispatch(loadingStatus({isLoading: false}))
        return {objects: res.data.objects}
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const getCategories = createAsyncThunk('vacancies/getCategories', async (param, thunkAPI) => {
    thunkAPI.dispatch(loadingStatus({isLoading: true}))
    try {
        const res = await vacanciesApi.getСatalogues();
        thunkAPI.dispatch(setCategories(res.data))
        thunkAPI.dispatch(loadingStatus({isLoading: false}))
        return {categories: res.data}
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const setFavoriteStatus = createAsyncThunk('vacancies/setFavorite', async (param: { id: number }, thunkAPI) => {
       thunkAPI.dispatch(loadingStatus({isLoading: true}))
    try {
        const res = await vacanciesApi.setFavorite(param.id);
        thunkAPI.dispatch(setStatus({id: param.id, favoriteStatus: true}))
            thunkAPI.dispatch(loadingStatus({isLoading: false}))
        return
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const setNoFavoriteStatus = createAsyncThunk('vacancies/setNoFavorite', async (param: {
    id: number
}, thunkAPI) => {
        thunkAPI.dispatch(loadingStatus({isLoading: true}))
    try {
        const res = await vacanciesApi.setNoFavorite(param.id);
        thunkAPI.dispatch(setNoStatus({id: param.id, favoriteStatus: false}))
            thunkAPI.dispatch(loadingStatus({isLoading: false}))
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
}

export const slice = createSlice({
    name: 'vacancies',
    initialState: <InitialStateType>{
        isLoading: false,
        categories: [],
        vacancies: {
            objects: [],
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
        loadingStatus(state, action: PayloadAction<{ isLoading: boolean }>) {
                state.isLoading = action.payload.isLoading;
        },

    },
})

export const vacancies = slice.reducer;

export const {
    setVacancies,
    setCategories,
    setStatus,
    setNoStatus,
    loadingStatus,
} = slice.actions


type InitialStateType = {
    isLoading:boolean
    vacancies: { objects: Array<ItemVacanciesType> }
    categories: CategoriesResponseType
}