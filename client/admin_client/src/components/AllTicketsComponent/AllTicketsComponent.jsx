import React,{useContext} from "react";
import UserContext from "../../context/UserContext";
import LoginComponent from "../LoginComponent/LoginComponent";

function AllTicketsComponent() {
  const {user} = useContext(UserContext);
  return (<div> All Tickets Component</div>);
}

export default AllTicketsComponent;
