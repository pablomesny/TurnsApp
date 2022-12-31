import { Navigate, Route, Routes } from "react-router-dom"
import { ClientsPage } from "../clients/pages"
import { NavBar } from "../components"
import { DatesPage } from "../dates/pages"

export const DatesRoutes = () => {
  return (
    <>
    <NavBar />
    <Routes>


        <Route path="dates" element={ <DatesPage /> } />
        <Route path="clients" element={ <ClientsPage /> } />

        <Route path="/" element={ <Navigate to="/dates" /> } />
    </Routes>
    </>
  )
}
