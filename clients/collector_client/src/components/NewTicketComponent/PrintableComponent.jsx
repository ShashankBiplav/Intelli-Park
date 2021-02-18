
import React, {useContext,useState, useRef} from 'react';
import UserContext from "../../context/UserContext";
import ReactToPrint from "react-to-print";
import {Redirect} from "react-router-dom";

function PrintableComponent() {
  const {user, setUser} = useContext(UserContext);
  const [done, setIsDone] = useState(false);
  const componentRef = useRef();
  
  const donePrinting = () =>{
    setUser({
      ...user,
      vehicleNumber: "",
      vehicleType: undefined,
      ownerPhone: undefined,
      amount: 0
    });
    setIsDone(true);
  };
  
  return (
    <div className="mx-auto mt-2 mb-4">
      {user.ownerPhone === undefined ? <Redirect to='/new-ticket' />: null}
      {done? <Redirect to='/new-ticket' />: null}
      <ReactToPrint trigger={() => <button className="mx-auto mb-4 px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-amber-700 hover:from-amber-600 to-amber-600 hover:to-amber-700 focus:ring focus:outline-none">PRINT</button>}
                    content={() => componentRef.current}
      />
      <div  ref={componentRef}>
        <h1 className="font-extrabold">VN:{user.vehicleNumber}</h1>
        <h2 className="font-extrabold">PH:{user.ownerPhone}</h2>
      </div>
        <button onClick={donePrinting} className="mx-auto mb-4 px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-green-700 hover:from-green-600 to-green-600 hover:to-green-700 focus:ring focus:outline-none">DONE</button>
    </div>
  );
}

export default PrintableComponent;
