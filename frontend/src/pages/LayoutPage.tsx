import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutPage: React.FC = () => {
    return (<>
        <Navbar/>
        <Outlet/>
    </>)
}

export default LayoutPage;