import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { onAddNewClient, onUpdateClient, setActiveClient } from "../store";

const initialForm = {
    name: '',
    reference: '',
    telephoneNumber: '',
    email: '',
}

export const ModalClients = ({ isOpenModal, handleOpenModal }) => {

    const dispatch = useDispatch();

    const { activeClient } = useSelector( state => state.clients );

    const [clientsFormValue, setClientsFormValue] = useState(activeClient);

    useEffect(() => {
      setClientsFormValue( activeClient );
    }, [activeClient]);

    useEffect(() => {
      dispatch( setActiveClient( clientsFormValue ) );
    }, [clientsFormValue]);
    


    const onInputChange = ({ target:{ name, value } }) => {
        setClientsFormValue({
            ...clientsFormValue,
            [name]: value
        });
    }

    const onSubmit = () => {
        const { name, reference, telephoneNumber } = clientsFormValue;
        const formIncomplete = name === '' || reference === '' || telephoneNumber === '';

        if( formIncomplete ){
            Swal.fire( 'Error', 'Todos los campos son obligatorios', 'error' );
            return;
        }

        if(!!clientsFormValue.uid) {
            dispatch( onUpdateClient( clientsFormValue ) );
        } else {
            dispatch( onAddNewClient( onCreateClientUid() ) );
        }

        setClientsFormValue(activeClient);
        handleOpenModal();
    }

    const onCreateClientUid = () => {
        return {
            ...clientsFormValue,
            uid: new Date().getTime()
        }
    }

    return (
        <Modal 
            show={isOpenModal} 
            onHide={handleOpenModal}
            size="md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>CLIENTE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label className="w-100" htmlFor="name">Nombre y apellido</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="name" 
                            value={ clientsFormValue.name }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label className="w-100" htmlFor="objectReference">Referencia</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="reference" 
                            value={ clientsFormValue.reference }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label className="w-100" htmlFor="telephoneNumber">Teléfono</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="telephoneNumber" 
                            value={ clientsFormValue.telephoneNumber }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label className="w-100" htmlFor="email">Email (opcional)</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="email" 
                            value={ clientsFormValue.email }
                            onChange={ onInputChange }
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOpenModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
