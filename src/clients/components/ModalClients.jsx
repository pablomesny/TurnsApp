import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clientsFormValidation } from "../../helpers";
import { useForm } from "../../hooks";
import { startNewClient, startUpdateClients } from "../../store/clients";

const emptyValues = {
    name: '',
    reference: '',
    telephoneNumber: '',
    email: ''
}

export const ModalClients = ({ initialState, isOpenModal, handleOpenModal, type }) => {

    const dispatch = useDispatch();

    const { formState, onInputChange, onResetForm} = useForm(
        type === 'new' 
            ? emptyValues 
            : initialState
    )

    const { name, reference, telephoneNumber, email } = formState;

    const onSubmit = (e) => {

        e.preventDefault();

        if( clientsFormValidation(formState) ) return;

        if(!!formState.id) {
            dispatch( startUpdateClients( formState ) );
        } else {
            dispatch( startNewClient( formState ) );
        }

        onResetForm();

        handleOpenModal();
    }

    const onPressEnter = (e) => {
        if( e.key === 'Enter' ) onSubmit(e);
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
                <form id='clientsForm' onSubmit={onSubmit} onKeyDown={onPressEnter} noValidate>
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
                        <label className="w-100" htmlFor="email">Email (opcional)</label>
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
                <Button variant="secondary" onClick={handleOpenModal}>
                    Cerrar
                </Button>
                <Button variant="primary" type="submit" form='clientsForm'>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
