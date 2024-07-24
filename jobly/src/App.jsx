import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // load user info from api, only running on login or log out
  useEffect(function loadUserInfo(){
    async function getCurrentUser(){
      if(token){
        try{
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        }catch(err){
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** logout function */
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  /** sign up function */
  async function signup(signupData){
    try{
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    }catch(errors){
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** handles logging in */
  async function login(loginData){
    try{
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return {success: true};
    }catch(errors){
      return {success: false, errors};
    }
  }
  /** checks if job has been applied to */
  function hasAppliedToJob(id){
    return applicationIds.has(id);
  }

  /** apply to a job by id */
  function applyToJob(id){
    if(hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }
  if(!infoLoaded) return <LoadingSpinner />;
  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App
