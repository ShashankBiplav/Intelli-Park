import React ,{useState} from  "react";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import NumberFormComponent from "./components/NumberFormComponent/NumberFormComponent";

function App() {
  const [user, setUser] = useState({
    isInit: true,
    ticket: undefined,
  });
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
          <Navbar/>
          <div >
           <NumberFormComponent />
          </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
