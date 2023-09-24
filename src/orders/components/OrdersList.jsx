import { useSelector } from "react-redux"
import { OrderItem } from "./OrderItem"

export const OrdersList = ({ isFilteredByFinished, searchValue }) => {
  const { isLoading, registeredOrders } = useSelector(state => state.orders);

  const sortedOrders = [...registeredOrders].sort((a, b) => b.id - a.id);
  const filteredOrders = sortedOrders.filter(order => order.isFinished === isFilteredByFinished);
  const filterBySearch = filteredOrders.filter(order => {
    if (searchValue === '') return order;

    const { name, lastName, phoneNumber, brand, model, defect, id } = order;

    const searchValueLowerCase = searchValue.toLowerCase();

    return name.toLowerCase().includes(searchValueLowerCase) ||
      lastName.toLowerCase().includes(searchValueLowerCase) ||
      phoneNumber.toLowerCase().includes(searchValueLowerCase) ||
      brand.toLowerCase().includes(searchValueLowerCase) ||
      model.toLowerCase().includes(searchValueLowerCase) ||
      defect.toLowerCase().includes(searchValueLowerCase) ||
      id.toString() === searchValueLowerCase;
  })

  return (
    <>
      {
        filterBySearch.length === 0 && !isLoading &&
        <h4 className="text-center">
          No se registran órdenes.
        </h4>
      }
      {
        filterBySearch.length > 0 && (
          <section className="container pt-2 pb-2 mw-100 card-section">
            <div className="row d-flex justify-content-center mt-3">
              {filterBySearch.map(order => (
                <OrderItem order={order} key={order.id} />
              ))}
            </div>
          </section>
        )
      }
    </>
  )
}
