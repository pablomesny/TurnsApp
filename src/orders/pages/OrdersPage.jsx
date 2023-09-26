import { useEffect, useRef, useState } from "react";
import { ModalOrders } from "../components/ModalOrders";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingOrders } from "../../store/orders/thunks";
import { login } from "../../store";
import { OrdersList } from "../components/OrdersList";

export const OrdersPage = () => {

  const dispatch = useDispatch();

  const { registeredOrders, isLoading } = useSelector(state => state.orders);
  const { status } = useSelector(state => state.auth);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFilteredByFinished, setIsFilteredByFinished] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const searchInputRef = useRef();

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

  const handleOpenModal = () => {
    setIsOpenModal(prev => !prev);
  }

  const handleToggleFilter = () => {
    setSearchValue('');
    searchInputRef.current.value = '';
    setIsFilteredByFinished(prev => !prev);
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchInputRef.current.value);
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
                  <input ref={searchInputRef} type="text" className="my-4 form-control" placeholder="Buscar.." />
                </div>
                <div className="col-3">
                  <button onClick={handleSubmitSearch} type="submit" className=" my-4">
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
        <div className="row mb-3">
          <div className="col-12 justify-content-center">
            <div className="d-flex gap-3 border border-2  border-dark ms-auto me-auto ps-3 pe-3 pt-2 pb-2 rounded" style={{ width: 'fit-content' }}>
              <button style={!isFilteredByFinished ? { fontSize: '1.2rem', padding: '0.5rem', cursor: 'default' } : { fontSize: '1.2rem', padding: '0.5rem', backgroundColor: 'transparent', cursor: 'pointer' }} disabled={!isFilteredByFinished} onClick={handleToggleFilter}>No terminados</button>
              <span className="border border-1 border-dark"></span>
              <button style={isFilteredByFinished ? { fontSize: '1.2rem', padding: '0.5rem', cursor: 'default' } : { fontSize: '1.2rem', padding: '0.5rem', backgroundColor: 'transparent', cursor: 'pointer' }} disabled={isFilteredByFinished} onClick={handleToggleFilter}>Terminados</button>
            </div>
          </div>

        </div>
      </main>

      <ModalOrders isOpenModal={isOpenModal} handleOpenModal={handleOpenModal} />

      <OrdersList isFilteredByFinished={isFilteredByFinished} searchValue={searchValue} />
    </>
  )
}
