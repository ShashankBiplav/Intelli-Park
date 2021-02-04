import React, {useState, useContext} from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Axios from "axios";
import UserContext from "../../context/UserContext";

function NumberFormComponent () {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData= async() => {
    setIsLoading(true);
    const vehicleNumber= document.getElementById('vehicleNumber').value;
    const userPhone= document.getElementById('phone').value;
    if (!vehicleNumber || !userPhone){
      alert("Empty");
      setIsLoading(false);
      return;
    }
    const url = "https://intelli-park.herokuapp.com/user/ticket";
    let res;
    try {
      res = await Axios.post(url, {
        "ownerPhone": user.userPhone,
        "vehicleNumber": user.vehicleNumber
      }, {
        headers: {
          'content-type': 'application/json'
        }
      });
      setUser({
        ...user,
        ticket: res.data.ticket,
        ownerPhone:undefined,
        vehicleNumber: undefined,
        isInit: false
      });
    } catch (err) {
      alert(`ERROR: ${err.message}`);
      setUser({
        ...user,
        isInit:false,
        ownerPhone:undefined,
        vehicleNumber: undefined,
        notFound: true
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };
  
  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "vehicleNumber":
        setUser({
          ...user,
          vehicleNumber: value
        });
        break;
      case "phone":
        setUser({
          ...user,
          userPhone: value
        });
        break;
      default:
        break;
    }
  };
  
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
        <div
          className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
          <div className="relative ">
            <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="VEHICLE NUMBER" value={user.vehicleNumber} onChange={inputHandler}
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          <div className="relative ">
            <input type="number" id="phone" name="phone" placeholder="YOUR MOBILE NUMBER" value={user.userPhone} onChange={inputHandler}
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          {!isLoading ?<button onClick={fetchData}
                               className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">CHECK STATUS
          </button>: <LoadingSpinner />}
        </div>
      </div>
    </section>
  );
}

export default NumberFormComponent;
