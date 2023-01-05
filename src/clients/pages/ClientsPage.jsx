import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ClientList, ModalClients, NavBar } from "../../components";
import { login, onOpenClientsModal } from "../../store";

// TODO: Resolver doble login desde thunk de auth y useEffect de este componente

export const ClientsPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
            dispatch(login(authData));
        }
    }, []);

    const handleOpenModal = () => {
        dispatch(onOpenClientsModal());
    };

    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col-5">
                        <h2 className="py-4">CLIENTES</h2>
                    </div>

                    <form className="col-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-9 d-flex justify-content-end">
                                    <input
                                        className="w-100 my-4"
                                        type="text"
                                        placeholder="Ingrese datos del cliente..."
                                    />
                                </div>
                                <div className="col-3">
                                    <button type="submit" className="my-4">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="col-3 d-flex justify-content-end h-100">
                    <button className="my-4 w-100" onClick={handleOpenModal}>
                        Crear nuevo cliente
                    </button>
                    </div>
                </div>
            </main>

            <ModalClients />

            <ClientList />

            {/* // TODO: Linea divisora en css y mapear clientes filtrados */}
        </>
    );
};
