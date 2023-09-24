import { useSelector } from "react-redux"
import { OrderItem } from "./OrderItem"

export const OrdersList = ({ isFilteredByFinished }) => {

  const { isLoading, registeredOrders } = useSelector(state => state.orders);

  const sortedOrders = [...registeredOrders].sort((a, b) => b.id - a.id);
  const filteredOrders = sortedOrders.filter(order => order.isFinished === isFilteredByFinished);

  return (
    <>
      {
        filteredOrders.length === 0 && !isLoading &&
        <h4 className="text-center">
          No se registran órdenes.
        </h4>
      }
      {
        filteredOrders.length > 0 && (
          <section className="container pt-2 pb-2 mw-100 card-section">
            <div className="row d-flex justify-content-center mt-3">
              {filteredOrders.map(order => (
                <OrderItem order={order} key={order.id} />
              ))}
            </div>
          </section>
        )
      }
    </>
  )
}
