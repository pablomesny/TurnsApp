import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store";
import { startLoadingClients } from "../../store/clients";
import { ClientList, ModalClients } from "../components";

export const ClientsPage = () => {

  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clientsFilter, setClientsFilter] = useState('');

  const { status } = useSelector(state => state.auth);
  const { registeredClients, isLoading } = useSelector(state => state.clients)

  useEffect(() => {
    if (registeredClients.length === 0) {
      dispatch(startLoadingClients());
    }
  }, []);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && status !== 'authenticated') {
      dispatch(login(authData));
    }
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const onInputChange = ({ target }) => {
    setClientsFilter(target.value);
  }

  return (
    <>
      <main className="container mb-2 mt-2">
        <div className="row">
          <div className="col-12 col-md-5">
            <h2 className="py-4">CLIENTES</h2>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-end">
            <input
              className="my-4 form-control"
              type="text"
              placeholder="Filtrar clientes por nombre..."
              value={clientsFilter}
              onChange={onInputChange}
            />
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-end h-100">
            <button
              className="my-4 w-100"
              onClick={handleOpenModal}
            >
              Crear nuevo cliente
            </button>
          </div>
        </div>
      </main>

      {/* LOADING SPINNER */}
      <div className="d-flex justify-content-center mt-5">
        <div className={isLoading ? "lds-facebook" : "d-none"}><div></div><div></div><div></div></div>
      </div>

      <ModalClients
        isOpenModal={isOpenModal}
        handleOpenModal={handleOpenModal}
        type={'new'}
      />

      <ClientList clientsFilter={clientsFilter} />
    </>
  );
};
