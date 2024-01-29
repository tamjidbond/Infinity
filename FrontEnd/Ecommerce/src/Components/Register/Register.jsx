import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import gogoleLogo from "./../../assets/logo/google.png"
import { useState, useContext } from "react";
import login from "./../../assets/animation/login.json"
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Register.css"
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const Register = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowpassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const location = useLocation()
    const { registerUser, loginWithPopup, loading, setLoading } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowpassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    const handleSubmit = (e) => {
        setErrorMsg('');
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email.length < 6) {
            setErrorMsg("Password Must be Atleast 6 charecter")
            return
        } else if (!/[A-Z]/.test(password)) {
            setErrorMsg("You should Have At Least One Uppercase Charrecter")
            return
        } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
            setErrorMsg("You must Include one Special Charecter")
            return
        }
        registerUser(email, password)
            .then(res => {
                console.log(res.user)
                e.target.reset();
                Swal.fire({
                    title: 'Registered Successfully!',
                    text: 'Go To Login Page',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                })
                navigate(location.state? location.state: '/')
                setLoading(false)
            })
            .catch(error => {
                setErrorMsg(error.code)
                console.log(error)
                setLoading(false)
            })

    }

    const handleSignInWithPopup = () => {
        loginWithPopup()
            .then(res => {
                console.log(res)
                Swal.fire({
                    title: 'Registered Successfully!',
                    icon: 'success',
                })
                navigate(location.state? location.state: '/')
            })
            .catch(error => console.log(error.code))
    }




    return (
        <div className="reg">
            <div className="" >
                <div className="hero h-[91vh] bg flex flex-col items-center justify-center" >
                    <h3 className="text-4xl font-bold">Register</h3>
                    <div>
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="max-w-44 md:max-w-full text-center lg:text-left lg:flex flex-col items-center hidden md:hidden ">
                                <Lottie animationData={login}></Lottie>
                            </div>
                            <div className=" card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleSubmit} className="card-body pb-0">



                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input required type="email" placeholder="Enter email" name="email" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password (At least 6 charecter)</span>
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
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <div className="flex items-center gap-2 border-[1px] px-2 rounded-lg">
                                            <input required onChange={e => setConfirmPassword(e.target.value)} type={`${showConfirmPassword ? 'text' : 'password'}`} name="confirmPassword" placeholder="Confirm Password" className="flex-1 input input-bordered pass" />
                                            <div onClick={handleShowConfirmPassword}>
                                                {
                                                    showConfirmPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <button className={`btn btn-primary  font-bold text-xl ${(password === confirmPassword && password.length >= 6) && 'bg-gradient-to-r from-indigo-500  to-cyan-500'}`} disabled={(password === confirmPassword && password.length >= 6) ? "" : "disabled"}>
                                            {
                                                loading ?
                                                    <span className="loading loading-spinner text-success"></span> :
                                                    "Sign Up"
                                            }
                                        </button>

                                    </div>
                                    <div className="">
                                        <label className="label ">
                                            <Link to="/login" className="label-text-alt link link-hover">Already Have An Account?</Link>
                                        </label>
                                    </div>
                                </form>
                                <hr />
                                <div className="w-full mt-4 mb-2 flex justify-center">
                                    <button onClick={handleSignInWithPopup} className="btn w-[90%] flex items-center justify-center gap-2 font-bold">
                                        <img className="max-w-8" src={gogoleLogo} alt="" />
                                        <p>Sign Up with google</p>
                                    </button>
                                </div>
                                <div className="text-center mb-2 text-red-500 font-bold">
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

export default Register;