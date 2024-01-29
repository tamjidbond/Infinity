import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidLogIn } from "react-icons/bi";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { GiOverInfinity } from "react-icons/gi";

import './navbar.css'
import { useContext, } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";



const Navbar = () => {

    const { user, LogOut } = useContext(AuthContext)


    const links = <>
        <li>
            <NavLink className='text-xl' to="/">
                <IoHome></IoHome>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink className='text-xl' to="/shop">
                <FaShopify></FaShopify>
                Shop
            </NavLink>
        </li>
        <li>
            <NavLink className='text-xl' to="/support">
                <MdConnectWithoutContact></MdConnectWithoutContact>
                Support
            </NavLink>
        </li>


    </>
    return (
        <div className=" bg-gradient-to-r from-indigo-500  to-cyan-500  font-bold text-white">
            <div className="max-w-7xl mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-r from-indigo-500  to-cyan-500 rounded-box w-52">
                                {links}
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-3xl font-bold gap">
                            <GiOverInfinity></GiOverInfinity>
                            Infinity
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">

                        {
                            !user &&
                            <>
                                <Link to='/login'>
                                    <button className="btn btn-ghost">
                                        <div className="flex items-center text-xl">
                                            <BiSolidLogIn></BiSolidLogIn>
                                            <div>Login</div>
                                        </div>
                                    </button>
                                </Link>
                            </>
                        }
                        <div className="text-4xl flex items-center gap-4">
                            <div className="">
                                <div className="flex gap-2">
                                    {
                                        user && <>
                                            <Link className='text-xl' to='/cart'>
                                                <button className="btn btn-ghost flex text-xl">
                                                    <FaShoppingCart></FaShoppingCart>
                                                    Cart
                                                </button>
                                            </Link>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                                    </div>
                                                </div>
                                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gradient-to-r from-indigo-500  to-cyan-500 rounded-box w-52">
                                                    <li>
                                                        <a className="justify-between">
                                                            Profile
                                                            <span className="badge">New</span>
                                                        </a>
                                                    </li>
                                                    <li><a>Settings</a></li>
                                                    <li><button onClick={LogOut}>Logout</button></li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;