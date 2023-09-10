import { useEffect, useState } from "react";
import { ModalOrders } from "../components/ModalOrders";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingOrders } from "../../store/orders/thunks";
import { login } from "../../store";
import { OrdersList } from "../components/OrdersList";

export const OrdersPage = () => {

  const dispatch = useDispatch();

  const { registeredOrders, isLoading } = useSelector(state => state.orders);
  const { status } = useSelector(state => state.auth);

  useEffect(() => {
    if (registeredOrders.length === 0) {
      dispatch(startLoadingOrders());
    }
  }, []);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && status !== 'authenticated') {
      dispatch(login(authData));
    }
  }, []);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(prev => !prev);
  }
  return (
    <>
      <main className='container mt-2 mb-2'>
        <div className="row">
          <div className="col-12 col-md-2">
            <h2 className="py-4">ÓRDENES</h2>
          </div>

          <form className="col-12 col-md-4 ms-auto me-auto">
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <input type="text" className="my-4 form-control" placeholder="Buscar.." />
                </div>
                <div className="col-3">
                  <button type="submit" className=" my-4">
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="col-12 col-md-3 d-flex ms-auto h-100">
            <button
              className="my-4 w-100"
              onClick={handleOpenModal}
            >
              Crear nueva orden
            </button>
          </div>
        </div>
      </main>

      <ModalOrders isOpenModal={isOpenModal} handleOpenModal={handleOpenModal} />

      <OrdersList />
    </>
  )
}
