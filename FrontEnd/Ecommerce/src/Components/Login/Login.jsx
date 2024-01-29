/* eslint-disable no-unused-vars */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import gogoleLogo from "./../../assets/logo/google.png"
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/login.json"
import "./Login.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowpassword] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowpassword(!showPassword)
    }

    const { loginWithPopup, loading, logInWithEmail } = useContext(AuthContext)
    const handleGoogleLogin = () => {
        loginWithPopup()
            .then(res => {

                console.log(res)
                navigate(location?.state ? location.state : "/")

            })
            .catch(error => console.log(error.code))
    }


    const location = useLocation();

    const handleLogin = (e) => {
        setErrorMsg('');
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setErrorMsg("Please Enter At Least 6 Charecters");
            return;
        }
        logInWithEmail(email, password)
            .then(res => {
                console.log(location)
                console.log(res)
                navigate(location?.state ? location.state : "/")

            })
            .catch(error => {
                switch (error.code) {
                    case "auth/invalid-email":
                    case "auth/user-not-found":
                        setErrorMsg("Email is Incorrect");
                        break
                    case "auth/wrong-password":
                        setErrorMsg("Password is invalid")
                        break
                    default:
                        setErrorMsg("Login failed. Please try again.")
                }

            })





    }
    return (
        <div>
            <div className="log" >
                <div className="hero h-[91vh] bg flex flex-col items-center justify-center" >
                    <h3 className="text-4xl font-bold ">Log In</h3>
                    <div>
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="max-w-44 md:max-w-full text-center lg:text-left lg:flex flex-col items-center hidden md:hidden ">
                                <Lottie animationData={loginAnimation}></Lottie>
                            </div>
                            <div className=" card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleLogin} className="card-body pb-0">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <div className="flex items-center gap-2 border-[1px] px-2 rounded-lg">
                                            <input required onChange={(e) => { setPassword(e.target.value) }} type={`${showPassword ? 'text' : 'password'}`} name="password" placeholder="password" className="flex-1 input input-bordered pass" />
                                            <div onClick={handleShowPassword}>
                                                {
                                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <button className={`btn btn-primary bg-gradient-to-r from-indigo-500  to-cyan-500 font-bold text-xl`}>
                                            {
                                                loading ?
                                                    <span className="loading loading-spinner text-success"></span> :
                                                    "Sign In"

                                            }
                                        </button>
                                    </div>
                                    <div className="">
                                        <label className="label ">
                                            <Link to="/register" className="label-text-alt link link-hover">Dont Have An Account?</Link>
                                        </label>
                                    </div>
                                </form>
                                <hr />
                                <div className="w-full mt-4 mb-2 flex justify-center">
                                    <button onClick={handleGoogleLogin} className="btn w-[90%] flex items-center justify-center gap-2 font-bold">
                                        <img className="max-w-8" src={gogoleLogo} alt="" />
                                        <p>Sign In with google</p>
                                    </button>
                                </div>
                                <div className="text-center font-bold mb-2 text-red-500">
                                    {
                                        errorMsg
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnGroup shadow-xl ">
                        <div className="join join-horizontal lg:join-horizontal font-bold">
                            <NavLink to="/login" className="btn bg-white join-item font-bold">Login</NavLink>
                            <NavLink to="/register" className="btn bg-white join-item font-bold">Register</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;