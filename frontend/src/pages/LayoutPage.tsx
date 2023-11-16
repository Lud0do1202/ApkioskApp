import React from "react";
import {Link, Outlet} from "react-router-dom";

const LayoutPage : React.FC = () => {
    return (<>
        <nav>
            <ul>
                <li>
                    <Link to="/dashboard">Home</Link>
                </li>
                <li>
                    <Link to="/tasks">Blogs</Link>
                </li>
            </ul>
        </nav>

        <Outlet />
    </>)
}

export default LayoutPage;