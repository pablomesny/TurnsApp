import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages";
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { TurnsRoutes } from './TurnsRoutes';

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <PrivateRoutes>
                        <TurnsRoutes />
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
