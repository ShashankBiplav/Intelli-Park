import React,{useState, useContext} from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


function LoginComponent () {
  const {user, setUser} = useContext(UserContext);
  const [isOTPMode, setIsOTPMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
   const requestOtp= async () => {
     setIsLoading(true);
     const phone = document.getElementById("phone").value;
     setUser({
       ...user,
       phone:phone
     });
     if (!phone){
       alert("Empty");
       setIsLoading(false);
       return;
     }
     const url = "https://intelli-park.herokuapp.com/auth/ticket-collector/get-otp";
     try {
        await Axios.post(url, {
         "phone": phone,
       }, {
         headers: {
           'content-type': 'application/json'
         }
       });
     } catch (err) {
       alert(`ERROR: ${err.message}`);
       setIsLoading(false);
       setIsOTPMode(true);
       return;
     }
     setIsLoading(false);
   };
   
   const login= async () => {
     setIsLoading(true);
     const otp = document.getElementById("otp").value;
     setUser({
       ...user,
       otp: otp
     });
     if (user.phone === undefined || !otp){
       alert("Empty");
       setIsLoading(false);
       return;
     }
     const url = "https://intelli-park.herokuapp.com/auth/ticket-collector/login/phone";
     let res;
     try {
       res = await Axios.post(url, {
         "phone": user.phone,
         "otp": otp
       }, {
         headers: {
           'content-type': 'application/json'
         }
       });
     } catch (err) {
       alert(`ERROR: ${err.message}`);
       setIsLoading(false);
       setIsOTPMode(false);
       return;
     }
     setIsLoading(false);
     let {token, userId} = res.data;
     let tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1)
     localStorage.setItem("auth-token", token);
     localStorage.setItem("exp-time", tomorrow.toISOString());
     setUser({
       ...user,
       isAuth: true,
       token,
       user: userId,
       expiryTime: tomorrow,
       phone: undefined,
       otp: undefined
     });
   };
  
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
        <div
          className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
          {isOTPMode? isLoading? <LoadingSpinner />:<>
            <div className="relative ">
              <input type="number" id="phone" name="phone" placeholder="Phone Number"
                     className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"/>
            </div>
            <button onClick={() =>
              requestOtp().then(()=>  setIsOTPMode(!isOTPMode))}
              className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">GET OTP
            </button>
          </>: isLoading? <LoadingSpinner />:
            <>
            <div className="relative ">
            <input type="number" id="otp" name="otp" placeholder="OTP"
            className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0" />
            </div>
            <button onClick={() =>
              login().then(()=>  setIsOTPMode(!isOTPMode))}
            className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">LOGIN
            </button>
            </>}
        </div>
      </div>
    </section>
);
}

export default LoginComponent;
