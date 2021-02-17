import React, {useContext, useRef} from 'react';
import UserContext from "../../context/UserContext";
import ReactToPrint from "react-to-print";

function PrintableComponent() {
  const {user} = useContext(UserContext);
  const componentRef = useRef();
  
  return (
    <div className="mx-auto mt-2 mb-4">
      <ReactToPrint trigger={() => <button className="mx-auto mb-4 px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-amber-700 hover:from-amber-600 to-amber-600 hover:to-amber-700 focus:ring focus:outline-none">PRINT</button>}
                    content={() => componentRef.current}
      />
      <div  ref={componentRef}>
      <h1 className="font-extrabold">VehicleNumber: {user.vehicleNumber}</h1>
      <h2 className="font-extrabold">OwnerContact:{user.ownerPhone}</h2>
      </div>
    </div>
  );
}

export default PrintableComponent;
