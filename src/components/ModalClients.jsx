import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { onAddNewClient, onUpdateClient, } from "../store";

export const ModalClients = ({ initialState = {}, isOpenModal, handleOpenModal }) => {

    const [clientsFormValue, setClientsFormValue] = useState(initialState);

    const dispatch = useDispatch();
  
    const onInputChange = ({ target:{ name, value } }) => {
        setClientsFormValue({
            ...clientsFormValue,
            [name]: value
        });
    }

    const onSubmit = () => {
        const { name, reference, telephoneNumber } = clientsFormValue;
        const formIncomplete = name === '' || reference === '' || telephoneNumber === '';

        console.log(clientsFormValue)

        if( formIncomplete ){
            Swal.fire( 'Error', 'Todos los campos son obligatorios', 'error' );
            return;
        }

        if(!!clientsFormValue.uid) {
            dispatch( onUpdateClient( clientsFormValue ) );
        } else {
            dispatch( onAddNewClient( onCreateClientUid() ) );
        }

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
