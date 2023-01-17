import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clientsFormValidation } from "../../helpers";
import { startNewClient, startUpdateClients } from "../../store/clients/thunks";

const emptyValues = {
    name: '',
    reference: '',
    telephoneNumber: '',
    email: ''
}

export const ModalClients = ({ initialState, isOpenModal, handleOpenModal, type }) => {

    const dispatch = useDispatch();

    const [clientsFormValue, setClientsFormValue] = useState( 
        type === 'new' 
            ? emptyValues 
            : initialState
    );
  
    const onInputChange = ({ target }) => {
        setClientsFormValue({
            ...clientsFormValue,
            [target.name]: target.value
        });
    }

    const onSubmit = () => {
        if( clientsFormValidation(clientsFormValue) ) return;

        if(!!clientsFormValue.id) {
            dispatch( startUpdateClients( clientsFormValue ) );
        } else {
            dispatch( startNewClient( clientsFormValue ) );
        }

        setClientsFormValue(emptyValues);

        handleOpenModal();
    }

    const onPressEnter = (e) => {
        if( e.key === 'Enter' ) onSubmit();
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
                <form onSubmit={onSubmit} onKeyDown={onPressEnter}>
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
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
