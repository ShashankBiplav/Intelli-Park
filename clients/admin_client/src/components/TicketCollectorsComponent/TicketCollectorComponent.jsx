import React,{useContext, useState} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function TicketCollectorComponent(props) {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const data = props.data;
  
  const toggleAuthorization= async(ticketCollectorId) =>{
    setIsLoading(true);
    const url = `https://intelli-park.herokuapp.com/administrator/toggle-auth/${ticketCollectorId}`;
    let res;
    try {
      res = await Axios.put(url, {},{headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }}
      );
      alert(res.data.message);
      data.isAuthorized = !data.isAuthorized;
      setIsLoading(false);
    } catch (err) {
      alert(`ERROR! ${err.message}`);
      setIsLoading((isLoading) => !isLoading);
      return;
    }
  }
  
  return (
    <div className= "m-6 object-cover object-center w-full lg:w-1/5">
      <div className={`p-6 rounded-lg shadow-lg overflow-hidden shadow max-w-full my-3 ${data.isVerified? "bg-green-300": "bg-red-200"} ${data.isAuthorized? "bg-green-900": "bg-red-300"}`}>
        <div className="text-center px-3 pb-6 pt-2">
          <h3 className="text-white text-xl bold font-sans">{data.name}</h3>
          <p className="mt-2 font-sans font-light text-grey-dark">{data.phone}</p>
        </div>
        <div className="flex justify-center pb-3 text-grey-dark">
          <div className="text-center mr-3 border-r pr-3">
            <h2 className="underline">VERIFIED</h2>
            <span>{data.isVerified? "YES": "NO"}</span>
          </div>
          <div className="text-center">
            <h2 className="underline">AUTHORIZED</h2>
            <span>{data.isAuthorized? "YES": "NO"}</span>
          </div>
        </div>
        <div className="my-6">
        
        {data.isAuthorized ?
          isLoading?<LoadingSpinner /> :<button onClick={() =>toggleAuthorization(data._id)}
                 className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-red-700 hover:from-red-600 to-red-600 hover:to-red-700 focus:ring focus:outline-none">
          UN-AUTHORIZE
        </button> : isLoading?<LoadingSpinner/> :<button onClick={() =>toggleAuthorization(data._id)}
                            className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">
          AUTHORIZE
        </button>}
        </div>
      </div>
    </div>
  );
}

export default TicketCollectorComponent;
