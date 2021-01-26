import React, {useContext, useState, useEffect} from "react";
import UserContext from "../../context/UserContext";
import LoginComponent from "../LoginComponent/LoginComponent";
import ParkingTicketsComponent from "../ParkingTicketsComponent/ParkingTicketsComponent";


function HomeComponent() {
  
  const {user} = useContext(UserContext);
  
  
  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     const url = "https://delivery-nodejs.herokuapp.com/admin/orders";
  //     let res;
  //     try {
  //       res = await axios.get(url, {
  //         headers: {
  //           'content-type': 'application/json',
  //           'authorization': 'Bearer ' + user.token
  //         }
  //       });
  //       console.log(res.data);
  //       setTickets(res.data);
  //       setIsLoading(false);
  //     } catch (err) {
  //       alert(`Invalid credentials ${err.message}`);
  //       setIsLoading((isLoading) => !isLoading);
  //       return;
  //     }
  //   }
  //   fetchTickets();
  // }, [user.token]);
  
  return (
    <div className="">
      {
        user.isAuth ? <ParkingTicketsComponent /> : <LoginComponent/>
      }
    </div>
  );
}

export default HomeComponent;
