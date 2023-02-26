import React, {useCallback, useEffect} from 'react';
import './App.css';

import {AppRootState, useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {HashRouter, Routes, Route} from "react-router-dom";
import { initializeAppTC } from './app-reducer';
import { logoutTC } from '../components/Login/auth-reducer';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import { Login } from '../components/Login/Login';
import {Profile} from "../components/Profile/Profile";
import {Menu} from "@mui/icons-material";



type PropsType = {
  demo?: boolean
}

function App({demo = false}: PropsType) {
  const dispatch = useAppDispatch()
  const status = useSelector<AppRootState>(state=> state.app.status)
  const initialized = useSelector<AppRootState, boolean>(state=> state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)


  useEffect(()=> {
    dispatch(initializeAppTC())
  }, [])

  const logoutHandler = useCallback(()=>{
    dispatch(logoutTC())
  },[])

  // if (!initialized) {
  //   return <div style={{position: 'fixed',width: '100%', top:'40%', textAlign: 'center'}}><CircularProgress /></div>
  // }

  return (
      <HashRouter>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start"  color="inherit" aria-label="menu">
                <Menu />
              </IconButton>
              <Typography variant="h6" >
                News
              </Typography>
              {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress />}
          </AppBar>
          <Routes>
            <Route path={"/"} element={ <Profile/>} />
            <Route path={"/login"} element={<Login/>} />
            <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
          </Routes>
        </div>
      </HashRouter>
  );
}

export default App