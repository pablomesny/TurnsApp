import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientList, ModalClients } from "../../components";
import { login } from "../../store";
import { startLoadingClients } from "../../store/clients/thunks";
import { startLoadingTurns } from "../../store/workdates";

// TODO: Resolver doble login desde thunk de auth y useEffect de este componente

export const ClientsPage = () => {

    const dispatch = useDispatch();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [clientsFilter, setClientsFilter] = useState('');

    const { status } = useSelector( state => state.auth );
    const { dates } = useSelector ( state => state.workDates );
    const { registeredClients } = useSelector( state => state.clients)

    useEffect(() => {
        if( dates.length === 0 ){
            dispatch(startLoadingTurns());
        }
        if( registeredClients.length === 0 ){
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
        setClientsFilter( target.value );
    }

    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col-5">
                        <h2 className="py-4">CLIENTES</h2>
                    </div>

                    <div className="col-4 d-flex justify-content-end">
                        <input
                            className="w-100 my-4"
                            type="text"
                            placeholder="Filtrar clientes por nombre..."
                            value={ clientsFilter }
                            onChange={ onInputChange }
                        />
                    </div>

                    <div className="col-3 d-flex justify-content-end h-100">
                        <button
                            className="my-4 w-100"
                            onClick={handleOpenModal}
                        >
                            Crear nuevo cliente
                        </button>
                    </div>
                </div>
            </main>

            <ModalClients
                isOpenModal={isOpenModal}
                handleOpenModal={handleOpenModal}
            />

            <ClientList clientsFilter={ clientsFilter } />
        </>
    );
};
