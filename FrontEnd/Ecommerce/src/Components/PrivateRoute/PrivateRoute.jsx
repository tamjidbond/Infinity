import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const { user, isLoading } = useContext(AuthContext)

    const location = useLocation();

    if (isLoading) {
        return <div className="min-h-screen min-w-screen mx-auto flex justify-center items-center"><span className="bg-red-500 mx-auto loading loading-spinner loading-lg"></span></div>
    }
    if(user){
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

PrivateRoute.protpTypes ={
    children: PropTypes.node
}
export default PrivateRoute;