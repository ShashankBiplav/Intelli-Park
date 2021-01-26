import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AllTicketsComponent from "./components/AllTicketsComponent/AllTicketsComponent";
import NewTicketCollectorComponent from "./components/NewTicketCollectorComponent/NewTicketCollectorComponent";
import TicketCollectorsComponent from "./components/TicketCollectorsComponent/TicketCollectorsComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";

function App() {
  const [user, setUser] = useState({
    isAuth: false,
    token: undefined,
    user: undefined,
    expiryTime: undefined,
  });
  useEffect(() => {
    //TODO: set timer in this function
    const autoLogin = () => {
      //check for the token in the localStorage
      let token = localStorage.getItem("auth-token");
      //check for the expiredTime in localStorage
      let expTime = localStorage.getItem("exp-time");
      if (token === null || expTime === null || expTime==="") {
        //if no token key found, set it to an empty string
        localStorage.setItem("auth-token", "");
        localStorage.setItem("exp-time", "");
        token = "";
        expTime = "";
        return;
      }
      
      let currentTime = new Date().toISOString();
      let expiryTime = new Date(expTime).toISOString();
      if ((expiryTime > currentTime) && token) {
        setUser(user => ({
          ...user,
          isAuth: true,
          token,
          expiryTime
        }));
      } else {
        token = "";
      }
    }
    autoLogin();
  }, []);
  
  //logic for logout
  const logOut = () => {
    setUser({
      ...user,
      token: undefined,
      user: undefined,
      isAuth: false,
      expiryTime: undefined
    });
    
    //removing the token from localStorage
    const token = localStorage.getItem("auth-token");
    if (token) {
      localStorage.setItem("auth-token", "");
      localStorage.setItem("exp-time", "");
    }
  }
  
  return (
    <>
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser, logOut}}>
      <Navbar />
        <Switch>
          <Route exact path="/login" component={LoginComponent}/>
          <ProtectedRoute exact path="/ticket-collectors" component={TicketCollectorsComponent}/>
          <ProtectedRoute exact path="/new-ticket-collector" component={NewTicketCollectorComponent}/>
          <ProtectedRoute exact path="/" component={AllTicketsComponent} />
          <Route path="*" component={<h1>Page Not found</h1>}/>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
</>
  );
}

export default App;
