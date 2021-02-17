import React, {useState, useContext, useRef} from "react";
import Axios from "axios";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserContext from "../../context/UserContext";
import PrintableComponent from "./PrintableComponent";

function NewTicketComponent() {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const createTicket = async () => {
    setIsLoading(true);
    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const vehicleType = document.getElementById("vehicleType").value;
    const ownerPhone = document.getElementById("ownerPhone").value;
    const amount = document.getElementById("amount").value;
    if (!amount || !vehicleNumber || !ownerPhone || !vehicleType) {
      alert("Empty");
      setIsLoading(false);
      return;
    }
    setUser({
      ...user,
      vehicleNumber: vehicleNumber,
      vehicleType: vehicleType,
      ownerPhone: ownerPhone,
      amount: amount
    });
    const url = "https://intelli-park.herokuapp.com/ticket-collector/create-ticket";
    try {
      await Axios.post(url, {
        "vehicleNumber": user.vehicleNumber,
        "vehicleType": parseInt(user.vehicleType),
        "ownerPhone": user.ownerPhone,
        "amount": user.amount
      }, {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      });
      alert('NEW TICKET CREATED');
    } catch (err) {
      alert(`ERROR: ${err.message}`);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setUser({
      ...user,
      vehicleNumber: "",
      vehicleType: undefined,
      ownerPhone: undefined,
      amount: 0
    });
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
      case "vehicleType":
        setUser({
          ...user,
          vehicleType: value
        });
        break;
      case "ownerPhone":
        setUser({
          ...user,
          ownerPhone: value
        });
        break;
      case "amount":
        setUser({
          ...user,
          amount: value
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
          <PrintableComponent />
            <div className="relative ">
              <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="VEHICLE NUMBER"
                     value={user.vehicleNumber} onChange={inputHandler}
                     className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
            </div>
            <div className="relative ">
              <input type="number" id="vehicleType" name="vehicleType" placeholder="2/4 Wheeler"
                     value={user.vehicleType} onChange={inputHandler}
                     className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
            </div>
            <div className="relative ">
              <input type="number" id="ownerPhone" name="ownerPhone" placeholder="Owner Phone Number"
                     value={user.ownerPhone} onChange={inputHandler}
                     className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
            </div>
            <div className="relative ">
              <input type="number" id="amount" name="amount" placeholder="₹ 25 / ₹ 40" value={user.amount}
                     onChange={inputHandler}
                     className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
            </div>
            {!isLoading ? <button onClick={() => createTicket()}
                                  className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">
              CREATE TICKET
            </button> : <LoadingSpinner/>}
          </div>
        </div>
      </section>
    );
}

export default NewTicketComponent;
