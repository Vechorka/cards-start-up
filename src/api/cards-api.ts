import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;

}



export const cardsAPI = {

}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type RegisterParamsType = {
    email: string,
    password: string,
    addedUser: {
    }
    error?: string;
}

export const authAPI = {
    register(data: RegisterParamsType){
        const promise = instance.post<RegisterParamsType>('auth/register', data)
        return promise
    },
    login(data: LoginParamsType){
        const promise = instance.post<LoginParamsType>('auth/login', data)
        return promise
    },
    logout() {
        const promise = instance.delete<LoginParamsType>('auth/login')
        return promise
    },
    me() {
        const promise = instance.post<LoginParamsType>('auth/me')
        return promise
    }
}

