import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "src/context/AuthContext";
import { useContext } from "react";

export const ProtectedRoute = () => {
    const auth = useContext(AuthContext);

    return auth.session === null ? <Navigate to="/login" /> : <Outlet />;
};
