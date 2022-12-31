import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onCloseClientsModal } from "../store";

export const ModalClients = () => {
    const dispatch = useDispatch();
    const { isClientsModalOpen } = useSelector((state) => state.ui);

    const handleCloseModal = () => {
        dispatch(onCloseClientsModal());
    };

    return (
        <Modal show={isClientsModalOpen} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>CLIENTE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div>
                        <label htmlFor="name">Nombre y apellido</label>
                        <input type="text" name="name" />
                    </div>
                    <div>
                        <label htmlFor="objectReference">Referencia</label>
                        <input type="text" name="objectReference" />
                    </div>
                    <div>
                        <label htmlFor="telephoneNumber">Teléfono</label>
                        <input type="number" name="telephoneNumber" />
                    </div>
                    <div>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
