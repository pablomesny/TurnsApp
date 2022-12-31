import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onCloseDatesModal } from "../store";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

export const ModalDates = () => {
    const dispatch = useDispatch();
    const { isDatesModalOpen } = useSelector((state) => state.ui);

    const handleCloseModal = () => {
        dispatch(onCloseDatesModal());
    };

    return (
        <Modal show={isDatesModalOpen} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>TURNO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div>
                        <label htmlFor="startDate">Fecha y hora de inicio</label>
                        <DatePicker
                            name="startDate"
                            placeholderText="Inicio"
                            locale="es"
                            dateFormat="Pp"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">Fecha y hora de finalización</label>
                        <DatePicker
                            name="endDate"
                            placeholderText="Fin"
                            locale="es"
                            dateFormat="Pp"
                        />
                    </div>
                    <div>
                        <label htmlFor="dateClientUid">Cliente</label>
                        <input type="option" name="dateClientUid"/>
                    </div>
                    <div>
                        <label htmlFor="price">Presupuesto</label>
                        <input type="number" name="price" />
                    </div>
                    <div>
                        <label htmlFor="description">Descripción</label>
                        <input type="text" name="description"/>
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
