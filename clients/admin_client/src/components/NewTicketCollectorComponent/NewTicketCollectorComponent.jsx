import React, {useState, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function NewTicketCollectorComponent() {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  //login admin
  const createNewTicketCollector = async () => {
    setIsLoading(true);
    const phone = document.getElementById("phone").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    if (!phone || !name || !password || !confirmPassword) {
      alert("Empty");
      setIsLoading(false);
      return;
    }
    if(password !== confirmPassword){
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    const url = "https://intelli-park.herokuapp.com/auth/ticket-collector/signup/phone";
    try {
      await Axios.post(url, {
        "phone": phone,
        "name": name,
        "password": password
      }, {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      });
      alert('Ticket Collector Added');
    } catch (err) {
      alert(`unable to add ! ${err.message}`);
      setIsLoading((isLoading) => !isLoading);
      return;
    }
    setIsLoading((isLoading) => !isLoading);
  }
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
        <div
          className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
          <div className="relative ">
            <input type="text" id="name" name="name" placeholder="Name"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          <div className="relative ">
            <input type="number" id="phone" name="phone" placeholder="Phone Number"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          <div className="relative ">
            <input type="password" id="password" name="password" placeholder="Password"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          <div className="relative ">
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          {!isLoading ? <button onClick={createNewTicketCollector}
                                className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">ADD
            NEW TICKET COLLECTOR
          </button> : <LoadingSpinner/>}
        </div>
      </div>
    </section>
  );
}

export default NewTicketCollectorComponent;
