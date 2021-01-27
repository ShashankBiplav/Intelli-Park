import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ParkingTicketComponent from "./ParkingTicketComponent";

function ParkingTicketsComponent() {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState({});
  
  useEffect(() => {
    const fetchTickets = async () => {
      const url = "https://intelli-park.herokuapp.com/icket-collector/tickets";
      let res;
      try {
        res = await Axios.post(url, {},{headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }}
        );
        setTickets(res.data);
        setIsLoading(false);
      } catch (err) {
        alert(`Unable to fetch ${err.message}`);
        setIsLoading((isLoading) => !isLoading);
        return;
      }
    }
    fetchTickets();
  }, [user.token]);
  
  return (
    isLoading
      ?
      <LoadingSpinner/>
      : <div className="container px-8  pt-6 mx-auto lg:px-4 ">
        <div className="flex flex-wrap items-center text-center text-white">
          {tickets.parkingTickets.map((parkingTicket, index)=><ParkingTicketComponent key={parkingTicket['_id']}  data={tickets.parkingTickets[index]}/>)}
        </div>
    </div>
    
  );
  
}

export default ParkingTicketsComponent;
