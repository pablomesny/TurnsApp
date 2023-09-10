import { Navigate, Route, Routes } from "react-router-dom"
import { ClientsPage } from "../clients/pages"
import { NavBar } from "../components"
import { TurnsPage } from "../turns/pages"
import { OrdersPage } from "../orders/pages/OrdersPage"

export const TurnsRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>

        <Route path="turns" element={<TurnsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="orders" element={<OrdersPage />} />

        <Route path="/" element={<Navigate to="/turns" />} />

      </Routes>
    </>
  )
}
