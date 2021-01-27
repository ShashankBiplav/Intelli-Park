import React,{useState, useContext} from "react";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function NewTicketComponent(){
  return(
    <section className="text-gray-700 body-font">
      <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
        <div
          className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
          <div className="relative ">
            <input type="number" id="phone" name="phone" placeholder="Phone Number"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
          </div>
          {!isLoading ?<button onClick={createNewTicketCollector}
                               className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">ADD
            NEW TICKET COLLECTOR
          </button>: <LoadingSpinner />}
        </div>
      </div>
    </section>
  );
}

export default NewTicketComponent;
