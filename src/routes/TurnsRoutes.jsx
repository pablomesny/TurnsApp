import { Navigate, Route, Routes } from "react-router-dom"
import { ClientsPage } from "../clients/pages"
import { NavBar } from "../components"
import { TurnsPage } from "../turns/pages"

export const TurnsRoutes = () => {
  return (
    <>
    <NavBar />
    <Routes>

        <Route path="turns" element={ <TurnsPage /> } />
        <Route path="clients" element={ <ClientsPage /> } />

        <Route path="/" element={ <Navigate to="/turns" /> } />

    </Routes>
    </>
  )
}
