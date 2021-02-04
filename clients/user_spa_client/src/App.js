import React, {useState} from "react";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import FormComponent from "./components/FormComponent/FormComponent";
import TicketComponent from "./components/TicketComponent/TicketComponent";
import Footer from "./components/Footer/Footer";

function App() {
  const [user, setUser] = useState({
    isInit: true,
    notFound: false,
    vehicleNumber: undefined,
    userPhone: undefined,
    ticket: undefined,
  });
  return (
    <div className="flex flex-col h-screen justify-between">
      <UserContext.Provider value={{user, setUser}}>
        <Navbar/>
        <div>
          {user.isInit ? <FormComponent/> : <TicketComponent data={user.ticket}/>}
        </div>
        <Footer/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
