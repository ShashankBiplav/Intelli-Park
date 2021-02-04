import React, {useState, useContext, useEffect} from "react";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TicketCollectorComponent from "./TicketCollectorComponent";
import Axios from "axios";

function TicketCollectorsComponent() {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketCollectors, setTicketCollectors] = useState({});
  
  useEffect(() => {
    const fetchTicketCollectors = async () => {
      const url = "https://intelli-park.herokuapp.com/administrator/ticket-collectors";
      let res;
      try {
        res = await Axios.get(url, {headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }},
        );
        setTicketCollectors(res.data.ticketCollectors);
        setIsLoading(false);
      } catch (err) {
        alert(`Unable to fetch ${err.message}`);
        setIsLoading((isLoading) => !isLoading);
        return;
      }
    }
    fetchTicketCollectors();
  }, [user.token]);
  
  return (isLoading
    ?
    <LoadingSpinner/>
    : <div className="container px-8  pt-6 mx-auto lg:px-4 ">
      <div className="flex flex-wrap items-center text-center text-white">
        {ticketCollectors.map((ticketCollector, index)=><TicketCollectorComponent key={ticketCollector['_id']}  data={ticketCollectors[index]}/>)}
      </div>
    </div>);
}

export default TicketCollectorsComponent;
