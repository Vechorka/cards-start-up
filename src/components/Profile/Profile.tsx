import React, {useCallback, useEffect } from 'react';
import {AppRootState, useAppDispatch, useAppSelector} from '../../app/store';
import {useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import {fetchProfileTC} from "./profile-reducer";




type TodolistListPropsType = {
    demo?: boolean
}
export const Profile: React.FC<TodolistListPropsType> = ({demo = false}) => {
    console.log('App with redux')
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(()=> {
        if (demo || !isLoggedIn){
            return
        }
        dispatch(fetchProfileTC())
    },[])


    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div></div>
    )
}