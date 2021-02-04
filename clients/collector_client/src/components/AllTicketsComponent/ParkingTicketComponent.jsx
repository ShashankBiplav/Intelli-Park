import React, {useState, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


function ParkingTicketComponent(props) {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
const data = props.data;


  function getDateTime(date) {
    let parsedDate = new Date(date);
    return [
      parsedDate.toLocaleString('default', {month: 'short'}) + ' ' + (parsedDate.getDate()) + ', ' + parsedDate.getFullYear() + '  |  ',
      parsedDate.getHours() + ':' + parsedDate.getMinutes()
    ];
  }
  
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
      data.isActive = !data.isActive;
      setIsLoading(false);
    } catch (err) {
      alert(`ERROR! ${err.message}`);
      setIsLoading(false);
      return;
    }
  };
  
return(
  <div className= {`m-6 w-full lg:w-1/5  rounded-lg shadow-lg ${data.isActive? "bg-green-300": "bg-blue-200"}`}>
    <div className="p-6 object-cover object-center">
      <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font"> {data.vehicleNumber}
      </h2>
      <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-xl title-font"> ₹ {(Math.round(data.amount *100)/100).toFixed(2)}
      </h2>
      <hr/>
      <h3 className="mb-3">Owner Contact: {data.ownerPhone}</h3>
      <p className="mb-4 text-base leading-relaxed">CREATED BY: <br/> {data.createdBy['name']} | {data.createdBy['phone']}</p>
      <p className="mb-4 text-base leading-relaxed">STARTING TIME: <br/> {getDateTime(data.startingTime)}</p>
      {!data.isActive?<p className="mb-4 text-base leading-relaxed">ENDING TIME: <br/> {getDateTime(data.endingTime)}</p> : null}
      {data.isActive?<p className="mb-4 text-base leading-relaxed underline"> AMOUNT NOT COLLECTED</p>: <p className="mb-4 text-base leading-relaxed">COLLECTED BY: <br/> {data.collectedBy['name']} | {data.collectedBy['phone']}</p>}
      <p className="mb-4 text-base leading-relaxed">VEHICLE TYPE: {data.vehicleType} Wheeler</p>
      {data.isActive? isLoading ? <LoadingSpinner />
        :<button onClick={() =>  endTicket(data._id)}
                             className={"px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none"}> END TICKET</button>:  null}
    </div>
  </div>
);
}

export default ParkingTicketComponent;


