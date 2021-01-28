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
        <p className="mb-4 text-base leading-relaxed">CREATED BY: {data.createdBy['phone']}</p>
        <p className="mb-4 text-base leading-relaxed">STARTING TIME: {getDateTime(data.startingTime)}</p>
        <p className="mb-4 text-base leading-relaxed">VEHICLE TYPE: {data.vehicleType} Wheeler</p>
      </div>
    </div>
  );
}

export default ActiveTicketComponent;
