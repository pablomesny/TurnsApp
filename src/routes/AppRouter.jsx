import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages";
import { DatesRoutes } from "./DatesRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <PrivateRoutes>
                        <DatesRoutes />
                    </PrivateRoutes>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoutes>
                        <LoginPage />
                    </PublicRoutes>
                }
            />
        </Routes>
    );
};
