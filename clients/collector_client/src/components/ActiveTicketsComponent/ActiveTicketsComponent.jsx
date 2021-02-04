import React,{useState, useEffect, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ActiveTicketComponent from "./ActiveTicketComponent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function ActiveTicketsComponent() {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTickets, setActiveTickets] = useState({});
  
  useEffect(() => {
    const fetchActiveTickets = async () => {
      const url = "https://intelli-park.herokuapp.com/ticket-collector/active-tickets";
      let res;
      try {
        res = await Axios.get(url, {headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }}
        );
        console.log(res.data);
        setActiveTickets(res.data);
        setIsLoading(false);
      } catch (err) {
        alert(`Unable to fetch ${err.message}`);
        setIsLoading((isLoading) => !isLoading);
      }
    }
    fetchActiveTickets();
  }, [user.token]);
  
  const endTicket = async(ticketId) => {
    setIsLoading(true);
    const url = `https://intelli-park.herokuapp.com/ticket-collector/end-ticket/${ticketId}`;
    let res;
    try {
      res = await Axios.put(url, {},{headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }}
      );
      console.log(res.data.message);
      const ticketIndex=activeTickets.parkingTickets.findIndex(ticket=> ticket['id'] === ticketId)
      activeTickets.parkingTickets.splice(ticketIndex, 1);
      setIsLoading(false);
    } catch (err) {
      alert(`ERROR! ${err.message}`);
      setIsLoading(false);
    }
  };
  
  
  return(
    isLoading? <LoadingSpinner/>
    :
      <div className="container px-8  pt-6 mx-auto lg:px-4 ">
        <div className="flex flex-wrap items-center text-center text-white">
          {activeTickets.parkingTickets.map((parkingTicket, index)=><ActiveTicketComponent key={parkingTicket['_id']}  data={activeTickets.parkingTickets[index]} endActiveTicket={endTicket}/>)}
        </div>
      </div>
  );
}

export default ActiveTicketsComponent;
