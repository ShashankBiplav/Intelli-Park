import React, {useState} from "react";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import NumberFormComponent from "./components/NumberFormComponent/NumberFormComponent";
import TicketComponent from "./components/TicketComponent/TicketComponent";

function App() {
  const [user, setUser] = useState({
    isInit: true,
    notFound: false,
    vehicleNumber: undefined,
    userPhone: undefined,
    ticket: undefined,
  });
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Navbar/>
        <div>
          {user.isInit ? <NumberFormComponent/> : <TicketComponent data={user.ticket}/>}
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
