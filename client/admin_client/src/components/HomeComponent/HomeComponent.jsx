import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import LoginComponent from "../LoginComponent/LoginComponent";
import ParkingTicketsComponent from "../ParkingTicketsComponent/ParkingTicketsComponent";

function HomeComponent() {
  
  const {user} = useContext(UserContext);
  
  return (
    <div className="">
      {
        user.isAuth ? <ParkingTicketsComponent /> : <LoginComponent/>
      }
    </div>
  );
}

export default HomeComponent;
