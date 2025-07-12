import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function CustomLayout(){
    return(
        <>
            <Navbar />
            <Outlet />
        </>  
    );
}   
export default CustomLayout;