import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewClient, onCloseClientsModal } from "../store";

const initialForm = {
    name: '',
    reference: '',
    telephoneNumber: '',
    email: '',
    uid: ''
}

export const ModalClients = () => {

    const dispatch = useDispatch();

    const { isClientsModalOpen } = useSelector((state) => state.ui);

    const handleCloseModal = () => {
        dispatch(onCloseClientsModal());
    };

    const [clientsFormValue, setClientsFormValue] = useState({initialForm});

    const { name, reference, telephoneNumber, email, uid } = clientsFormValue;

    const onInputChange = ({ target:{ name, value } }) => {
        setClientsFormValue({
            ...clientsFormValue,
            [name]: value
        });
    }

    const onSubmit = () => {
        dispatch( onAddNewClient( onCreateNewClient() ) );
        setClientsFormValue(initialForm);
        handleCloseModal();
    }

    const onCreateNewClient = () => {
        return {
            ...clientsFormValue,
            uid: new Date().getTime()
        }
    }

    return (
        <Modal 
            show={isClientsModalOpen} 
            onHide={handleCloseModal}
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
                            value={ name }
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
                            value={ reference }
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
                            value={ telephoneNumber }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label className="w-100" htmlFor="email">Correo electrónico</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="email" 
                            value={ email }
                            onChange={ onInputChange }
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
