import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalClients, NavBar } from "../../components";
import { login, onOpenClientsModal } from "../../store";

export const ClientsPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('auth'));
        if(authData){
            dispatch( login(authData) );   
        }
      }, [])

    const handleOpenModal = () => {
        console.log('asd')
        dispatch( onOpenClientsModal() );
    }

    return (
        <>
            <main>
                <h2
                  className="py-4"
                >
                  CLIENTES
                </h2>

                <form>
                    <input
                        className="clients--search my-4"
                        type="text"
                        placeholder="Ingrese datos del cliente..."
                    />
                    <button type="submit" className="my-4">
                        Buscar
                    </button>
                </form>

                <button 
                    className="my-4"
                    onClick={ handleOpenModal }
                >
                    Crear nuevo cliente
                </button>
            </main>

            <ModalClients />

            {/* // TODO: Linea divisora en css y mapear clientes filtrados */}
        </>
    );
};
