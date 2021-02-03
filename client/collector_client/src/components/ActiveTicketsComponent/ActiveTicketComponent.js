import React from "react";


function ActiveTicketComponent (props) {
  
  const data = props.data;
  
  function getDateTime(date) {
    let parsedDate = new Date(date);
    return [
      parsedDate.toLocaleString('default', {month: 'short'}) + ' ' + (parsedDate.getDate()) + ', ' + parsedDate.getFullYear() + '  |  ',
      parsedDate.getHours() + ':' + parsedDate.getMinutes()
    ];
  }
  
  return (
    <div className= {"m-6 w-full lg:w-1/5  rounded-lg shadow-lg bg-green-300"}>
      <div className="p-6 object-cover object-center">
        <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font"> {data.vehicleNumber}
        </h2>
        <h2 className="mb-3 text-lg font-semibold text-gray-700 lg:text-xl title-font"> ₹ {(Math.round(data.amount *100)/100).toFixed(2)}
        </h2>
        <h3 className="mb-3">Owner Contact: {data.ownerPhone}</h3>
        <p className="mb-4 text-base leading-relaxed">CREATED BY: <br/> {data.createdBy['name']} | {data.createdBy['phone']}</p>
        <p className="mb-4 text-base leading-relaxed">STARTING TIME: <br/> {getDateTime(data.startingTime)}</p>
        {!data.isActive?<p className="mb-4 text-base leading-relaxed">ENDING TIME: <br/> {getDateTime(data.endingTime)}</p> : null}
        {data.isActive?<p className="mb-4 text-base leading-relaxed"> AMOUNT NOT COLLECTED YET</p>: <p className="mb-4 text-base leading-relaxed">COLLECTED BY: <br/> {data.collectedBy['name']} | {data.collectedBy['phone']}</p>}
        <p className="mb-4 text-base leading-relaxed">VEHICLE TYPE: {data.vehicleType} Wheeler</p>
        
          <button onClick={() =>  props.endActiveTicket(data._id)}
                   className={"px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none"}> END TICKET</button>
      </div>
    </div>
  );
}

export default ActiveTicketComponent;
