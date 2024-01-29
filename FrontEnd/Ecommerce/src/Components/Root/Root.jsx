import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './root.css'

const Root = () => {
    return (
        <div className="rootBg">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;